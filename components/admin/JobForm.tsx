"use client";

import {
  useState,
  type ChangeEvent,
  type ReactNode,
  type SubmitEvent,
} from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { compressImage } from "@/utils/compressImage";

type PhotoStatus = "uploading" | "ready" | "error";
type Side = "before" | "after";
type SubmitStatus = "idle" | "sending" | "sent" | "error";

type CategoryKey =
  | "bedroom"
  | "bathroom"
  | "kitchen"
  | "hallway"
  | "stairsLanding"
  | "additional";

interface Photo {
  id: string;
  previewUrl: string;
  blobUrl: string | null;
  status: PhotoStatus;
}

interface CategorySlot {
  id: string;
  photos: Photo[];
}

type CategoryPhotos = Record<CategoryKey, CategorySlot[]>;

interface InvoiceFile {
  fileName: string;
  blobUrl: string | null;
  status: PhotoStatus;
  error?: string;
}

const CATEGORIES: { key: CategoryKey; label: string }[] = [
  { key: "bedroom", label: "Bedroom" },
  { key: "bathroom", label: "Bathroom" },
  { key: "kitchen", label: "Kitchen" },
  { key: "hallway", label: "Hallway" },
  { key: "stairsLanding", label: "Stairs and Landing" },
  { key: "additional", label: "Additional Images" },
];

const createEmptyCategories = (): CategoryPhotos => {
  const categories = {} as CategoryPhotos;
  for (const { key } of CATEGORIES) {
    categories[key] = [{ id: `${key}-0`, photos: [] }];
  }
  return categories;
};

const allPhotos = (categories: CategoryPhotos): Photo[] =>
  CATEGORIES.flatMap(({ key }) =>
    categories[key].flatMap((slot) => slot.photos)
  );

const INVOICE_ACCEPT = ".pdf,.doc,.docx,.png,.jpg,.jpeg";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "w-full px-4 py-2.5 rounded-lg border border-ink/15 text-base font-tagline placeholder:text-ink/50 focus:outline-none focus:border-ink/40";

function Accordion({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="border border-ink/15 rounded-2xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 bg-purple-mist/60 text-left"
      >
        <span className="font-luckiest font-extrabold uppercase leading-none tracking-[-0.01em] text-lg">
          {title}
        </span>
        <svg
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`w-4 h-4 shrink-0 text-ink/60 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          <path d="M5 7l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="flex flex-col gap-6 p-5 pt-4 border-t border-ink/10">
          {children}
        </div>
      )}
    </div>
  );
}

function PhotoPicker({
  photos,
  onAdd,
  onRemove,
}: {
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
  );
}

function CategorySection({
  label,
  slots,
  allowAddSlot = true,
  onAddPhoto,
  onRemovePhoto,
  onAddSlot,
  onRemoveSlot,
}: {
  label: string;
  slots: CategorySlot[];
  allowAddSlot?: boolean;
  onAddPhoto: (slotId: string, file: File) => void;
  onRemovePhoto: (slotId: string, photo: Photo) => void;
  onAddSlot: () => void;
  onRemoveSlot: (slotId: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="font-tagline font-semibold text-sm">{label}</span>
        {allowAddSlot && (
          <button
            type="button"
            onClick={onAddSlot}
            aria-label={`Add another ${label} section`}
            title={`Add another ${label} section`}
            className="w-6 h-6 rounded-full border border-ink/20 text-ink/60 flex items-center justify-center hover:bg-ink/5"
          >
            <FiPlus size={13} />
          </button>
        )}
      </div>

      {slots.map((slot, index) => (
        <div key={slot.id} className="flex flex-col gap-2">
          {index > 0 && (
            <div className="flex items-center justify-between">
              <span className="font-tagline text-xs text-ink/50">
                {label} {index + 1}
              </span>
              <button
                type="button"
                onClick={() => onRemoveSlot(slot.id)}
                aria-label={`Remove ${label} ${index + 1}`}
                title={`Remove ${label} ${index + 1}`}
                className="text-red-600 hover:text-red-700 flex items-center"
              >
                <FiTrash2 size={14} />
              </button>
            </div>
          )}
          <PhotoPicker
            photos={slot.photos}
            onAdd={(file) => onAddPhoto(slot.id, file)}
            onRemove={(photo) => onRemovePhoto(slot.id, photo)}
          />
        </div>
      ))}
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
      <span className="font-tagline font-semibold text-sm">
        Invoice <span className="font-normal text-ink/50">(optional)</span>
      </span>

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
  const [beforeCategories, setBeforeCategories] =
    useState<CategoryPhotos>(createEmptyCategories);
  const [afterCategories, setAfterCategories] =
    useState<CategoryPhotos>(createEmptyCategories);
  const [invoice, setInvoice] = useState<InvoiceFile | null>(null);
  const [clientEmail, setClientEmail] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const categoriesSetter = (side: Side) =>
    side === "before" ? setBeforeCategories : setAfterCategories;

  const addPhoto = async (
    side: Side,
    categoryKey: CategoryKey,
    slotId: string,
    file: File
  ) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const setCategories = categoriesSetter(side);
    const previewUrl = URL.createObjectURL(file);

    const updateSlotPhotos = (updater: (photos: Photo[]) => Photo[]) => {
      setCategories((prev) => ({
        ...prev,
        [categoryKey]: prev[categoryKey].map((slot) =>
          slot.id === slotId ? { ...slot, photos: updater(slot.photos) } : slot
        ),
      }));
    };

    // Show the thumbnail + "Uploading..." immediately, before any async
    // work, so a later failure never looks like nothing happened.
    updateSlotPhotos((photos) => [
      ...photos,
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

      updateSlotPhotos((photos) =>
        photos.map((p) =>
          p.id === id ? { ...p, blobUrl: body.url, status: "ready" } : p
        )
      );
    } catch {
      updateSlotPhotos((photos) =>
        photos.map((p) => (p.id === id ? { ...p, status: "error" } : p))
      );
    }
  };

  const removePhoto = (
    side: Side,
    categoryKey: CategoryKey,
    slotId: string,
    photo: Photo
  ) => {
    categoriesSetter(side)((prev) => ({
      ...prev,
      [categoryKey]: prev[categoryKey].map((slot) =>
        slot.id === slotId
          ? { ...slot, photos: slot.photos.filter((p) => p.id !== photo.id) }
          : slot
      ),
    }));
    URL.revokeObjectURL(photo.previewUrl);

    if (photo.blobUrl) {
      fetch("/api/admin/stage-upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: photo.blobUrl }),
      }).catch(() => {});
    }
  };

  const addCategorySlot = (side: Side, categoryKey: CategoryKey) => {
    const id = `${categoryKey}-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}`;
    categoriesSetter(side)((prev) => ({
      ...prev,
      [categoryKey]: [...prev[categoryKey], { id, photos: [] }],
    }));
  };

  const removeCategorySlot = (
    side: Side,
    categoryKey: CategoryKey,
    slotId: string
  ) => {
    categoriesSetter(side)((prev) => {
      const slot = prev[categoryKey].find((s) => s.id === slotId);
      slot?.photos.forEach((photo) => {
        URL.revokeObjectURL(photo.previewUrl);
        if (photo.blobUrl) {
          fetch("/api/admin/stage-upload", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: photo.blobUrl }),
          }).catch(() => {});
        }
      });

      return {
        ...prev,
        [categoryKey]: prev[categoryKey].filter((s) => s.id !== slotId),
      };
    });
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

  const readyUrls = (categories: CategoryPhotos) =>
    allPhotos(categories)
      .filter((p) => p.status === "ready")
      .map((p) => p.blobUrl as string);

  const categoryCounts = (categories: CategoryPhotos) =>
    CATEGORIES.map(({ key, label }) => ({
      label,
      count: categories[key].reduce(
        (sum, slot) =>
          sum + slot.photos.filter((p) => p.status === "ready").length,
        0
      ),
    })).filter((c) => c.count > 0);

  const hasPendingUploads =
    [...allPhotos(beforeCategories), ...allPhotos(afterCategories)].some(
      (p) => p.status === "uploading"
    ) || invoice?.status === "uploading";

  // Invoice is optional: it's fine to submit with no invoice at all, but if
  // the admin attached one, don't let them submit while it's still
  // uploading or in a failed state — that would silently drop it.
  const invoiceOk = !invoice || invoice.status === "ready";

  const canSubmit =
    readyUrls(beforeCategories).length > 0 &&
    readyUrls(afterCategories).length > 0 &&
    invoiceOk &&
    EMAIL_REGEX.test(clientEmail) &&
    !hasPendingUploads &&
    status !== "sending";

  const resetForm = () => {
    [...allPhotos(beforeCategories), ...allPhotos(afterCategories)].forEach(
      (p) => URL.revokeObjectURL(p.previewUrl)
    );
    setBeforeCategories(createEmptyCategories());
    setAfterCategories(createEmptyCategories());
    setInvoice(null);
    setClientEmail("");
  };

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientEmail,
          beforeUrls: readyUrls(beforeCategories),
          afterUrls: readyUrls(afterCategories),
          beforeCategories: categoryCounts(beforeCategories),
          afterCategories: categoryCounts(afterCategories),
          invoiceUrl: invoice?.status === "ready" ? invoice.blobUrl : null,
          invoiceFileName: invoice?.status === "ready" ? invoice.fileName : null,
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
      <Accordion title="Before Photos">
        {CATEGORIES.map(({ key, label }) => (
          <CategorySection
            key={key}
            label={label}
            slots={beforeCategories[key]}
            allowAddSlot={key !== "additional"}
            onAddPhoto={(slotId, file) => addPhoto("before", key, slotId, file)}
            onRemovePhoto={(slotId, photo) =>
              removePhoto("before", key, slotId, photo)
            }
            onAddSlot={() => addCategorySlot("before", key)}
            onRemoveSlot={(slotId) => removeCategorySlot("before", key, slotId)}
          />
        ))}
      </Accordion>

      <Accordion title="After Photos">
        {CATEGORIES.map(({ key, label }) => (
          <CategorySection
            key={key}
            label={label}
            slots={afterCategories[key]}
            allowAddSlot={key !== "additional"}
            onAddPhoto={(slotId, file) => addPhoto("after", key, slotId, file)}
            onRemovePhoto={(slotId, photo) =>
              removePhoto("after", key, slotId, photo)
            }
            onAddSlot={() => addCategorySlot("after", key)}
            onRemoveSlot={(slotId) => removeCategorySlot("after", key, slotId)}
          />
        ))}
      </Accordion>

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
