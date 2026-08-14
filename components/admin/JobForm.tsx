"use client";

import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { compressImage } from "@/utils/compressImage";

type PhotoStatus = "uploading" | "ready" | "error";
type Side = "before" | "after";
type SubmitStatus = "idle" | "sending" | "sent" | "error";

interface Photo {
  id: string;
  previewUrl: string;
  blobUrl: string | null;
  status: PhotoStatus;
}

interface InvoiceFile {
  fileName: string;
  blobUrl: string | null;
  status: PhotoStatus;
  error?: string;
}

const INVOICE_ACCEPT = ".pdf,.doc,.docx,.png,.jpg,.jpeg";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "w-full px-4 py-2.5 rounded-lg border border-ink/15 text-base font-tagline placeholder:text-ink/50 focus:outline-none focus:border-ink/40";

function PhotoPicker({
  label,
  photos,
  onAdd,
  onRemove,
}: {
  label: string;
  photos: Photo[];
  onAdd: (file: File) => void;
  onRemove: (photo: Photo) => void;
}) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Snapshot the selected files into a real array before touching
    // `.value` — in Chrome/Safari, `event.target.files` is a live FileList
    // that gets cleared in place as soon as `.value` is reset, so reading
    // it afterward (even from a variable holding the same reference)
    // silently yields zero files.
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    files.forEach((file) => onAdd(file));
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="font-tagline font-semibold text-sm">{label}</span>

      <div className="flex flex-wrap gap-3">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="relative w-20 h-20 rounded-lg overflow-hidden border border-ink/15"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.previewUrl}
              alt=""
              className="w-full h-full object-cover"
            />
            {photo.status === "uploading" && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-[11px] font-tagline">
                Uploading...
              </div>
            )}
            {photo.status === "error" && (
              <div className="absolute inset-0 bg-red-600/70 flex items-center justify-center text-white text-[11px] font-tagline">
                Failed
              </div>
            )}
            <button
              type="button"
              onClick={() => onRemove(photo)}
              aria-label="Remove photo"
              className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 text-white text-xs leading-5 text-center"
            >
              ×
            </button>
          </div>
        ))}

        <label className="w-20 h-20 rounded-lg border border-dashed border-ink/30 flex items-center justify-center text-ink/50 text-[13px] font-tagline cursor-pointer text-center px-1">
          + Add
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleChange}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
}

function InvoicePicker({
  invoice,
  onAdd,
  onRemove,
}: {
  invoice: InvoiceFile | null;
  onAdd: (file: File) => void;
  onRemove: () => void;
}) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    event.target.value = "";
    if (file) onAdd(file);
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="font-tagline font-semibold text-sm">Invoice</span>

      {invoice ? (
        <div className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg border border-ink/15">
          <span
            className="font-tagline text-sm truncate"
            title={invoice.error}
          >
            {invoice.status === "uploading" && "Uploading… "}
            {invoice.status === "error" &&
              `Failed: ${invoice.error || "Upload failed"} — `}
            {invoice.fileName}
          </span>
          <button
            type="button"
            onClick={onRemove}
            aria-label="Remove invoice"
            className="shrink-0 w-5 h-5 rounded-full bg-ink/10 text-ink text-xs leading-5 text-center"
          >
            ×
          </button>
        </div>
      ) : (
        <label className="w-fit px-4 py-2.5 rounded-lg border border-dashed border-ink/30 text-ink/50 text-sm font-tagline cursor-pointer">
          + Add Invoice (PDF, Word, PNG, or JPG)
          <input
            type="file"
            accept={INVOICE_ACCEPT}
            onChange={handleChange}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
}

export default function JobForm() {
  const [beforePhotos, setBeforePhotos] = useState<Photo[]>([]);
  const [afterPhotos, setAfterPhotos] = useState<Photo[]>([]);
  const [invoice, setInvoice] = useState<InvoiceFile | null>(null);
  const [clientEmail, setClientEmail] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const listSetter = (side: Side) =>
    side === "before" ? setBeforePhotos : setAfterPhotos;

  const addPhoto = async (side: Side, file: File) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const setPhotos = listSetter(side);
    const previewUrl = URL.createObjectURL(file);

    // Show the thumbnail + "Uploading..." immediately, before any async
    // work, so a later failure never looks like nothing happened.
    setPhotos((prev) => [
      ...prev,
      { id, previewUrl, blobUrl: null, status: "uploading" },
    ]);

    try {
      const compressed = await compressImage(file);

      const formData = new FormData();
      formData.append("file", compressed);

      const res = await fetch("/api/admin/stage-upload", {
        method: "POST",
        body: formData,
      });
      const body = await res.json().catch(() => ({}));

      if (!res.ok) throw new Error(body?.error || "Upload failed");

      setPhotos((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, blobUrl: body.url, status: "ready" } : p
        )
      );
    } catch {
      setPhotos((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: "error" } : p))
      );
    }
  };

  const removePhoto = async (side: Side, photo: Photo) => {
    listSetter(side)((prev) => prev.filter((p) => p.id !== photo.id));
    URL.revokeObjectURL(photo.previewUrl);

    if (photo.blobUrl) {
      fetch("/api/admin/stage-upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: photo.blobUrl }),
      }).catch(() => {});
    }
  };

  const addInvoice = async (file: File) => {
    setInvoice({ fileName: file.name, blobUrl: null, status: "uploading" });

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/stage-upload", {
        method: "POST",
        body: formData,
      });
      const body = await res.json().catch(() => ({}));

      if (!res.ok) throw new Error(body?.error || "Upload failed");

      setInvoice({ fileName: file.name, blobUrl: body.url, status: "ready" });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      setInvoice({
        fileName: file.name,
        blobUrl: null,
        status: "error",
        error: message,
      });
    }
  };

  const removeInvoice = () => {
    if (invoice?.blobUrl) {
      fetch("/api/admin/stage-upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: invoice.blobUrl }),
      }).catch(() => {});
    }
    setInvoice(null);
  };

  const readyUrls = (photos: Photo[]) =>
    photos.filter((p) => p.status === "ready").map((p) => p.blobUrl as string);

  const hasPendingUploads =
    [...beforePhotos, ...afterPhotos].some((p) => p.status === "uploading") ||
    invoice?.status === "uploading";
  const canSubmit =
    readyUrls(beforePhotos).length > 0 &&
    readyUrls(afterPhotos).length > 0 &&
    invoice?.status === "ready" &&
    EMAIL_REGEX.test(clientEmail) &&
    !hasPendingUploads &&
    status !== "sending";

  const resetForm = () => {
    beforePhotos.forEach((p) => URL.revokeObjectURL(p.previewUrl));
    afterPhotos.forEach((p) => URL.revokeObjectURL(p.previewUrl));
    setBeforePhotos([]);
    setAfterPhotos([]);
    setInvoice(null);
    setClientEmail("");
  };

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit || invoice?.status !== "ready") return;

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientEmail,
          beforeUrls: readyUrls(beforePhotos),
          afterUrls: readyUrls(afterPhotos),
          invoiceUrl: invoice.blobUrl,
          invoiceFileName: invoice.fileName,
        }),
      });

      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrorMsg(body?.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      resetForm();
      setStatus("sent");
    } catch {
      setErrorMsg(
        "We couldn't reach the server. Check your connection and try again."
      );
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="flex flex-col gap-4 items-start">
        <div>
          <p className="font-luckiest font-extrabold uppercase text-2xl">
            Sent!
          </p>
          <p className="font-tagline text-ink/70 text-base">
            The client has been emailed their before &amp; after photos.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="font-bold text-base px-[30px] py-2.5 rounded-[10px] bg-purple-brand text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
        >
          Post Another Job
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <PhotoPicker
        label="Before Photos"
        photos={beforePhotos}
        onAdd={(file) => addPhoto("before", file)}
        onRemove={(photo) => removePhoto("before", photo)}
      />

      <PhotoPicker
        label="After Photos"
        photos={afterPhotos}
        onAdd={(file) => addPhoto("after", file)}
        onRemove={(photo) => removePhoto("after", photo)}
      />

      <InvoicePicker invoice={invoice} onAdd={addInvoice} onRemove={removeInvoice} />

      <div className="flex flex-col gap-2">
        <label
          htmlFor="clientEmail"
          className="font-tagline font-semibold text-sm"
        >
          Client Email
        </label>
        <input
          id="clientEmail"
          type="email"
          required
          placeholder="client@example.com"
          value={clientEmail}
          onChange={(e) => setClientEmail(e.target.value)}
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className="font-bold text-base px-[30px] py-2.5 max-sm:py-4 rounded-[10px] bg-purple-brand text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)] w-fit disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send to Client"}
      </button>

      {status === "error" && (
        <p className="font-tagline text-red-600 text-sm">{errorMsg}</p>
      )}
    </form>
  );
}
