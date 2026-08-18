"use client";

import React, { useEffect, useRef, useState } from "react";

import styles from "./PhotoGallery.module.css";

export function PhotoGallery(props: { photoUrls: string[] }) {
  const { photoUrls } = props;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const showPhoto = (index: number) => {
    setSelectedIndex(index);
    setIsOpen(true);
    dialogRef.current?.showModal();
  };

  const moveSelection = (offset: number) => {
    setSelectedIndex(current => (current + offset + photoUrls.length) % photoUrls.length);
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") moveSelection(-1);
      if (event.key === "ArrowRight") moveSelection(1);
    };

    dialog.addEventListener("keydown", handleKeyDown);
    return () => dialog.removeEventListener("keydown", handleKeyDown);
  }, [photoUrls.length]);

  if (photoUrls.length === 0) return null;

  return (
    <section className="my-6" aria-label="Photo gallery">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {photoUrls.map((photoUrl, index) => (
          <button
            className="group aspect-square overflow-hidden rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            key={photoUrl}
            onClick={() => showPhoto(index)}
            type="button"
            aria-label={`Open media ${index + 1} of ${photoUrls.length}`}
          >
            {isVideo(photoUrl)
              ? (
                <video
                  className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                  src={photoUrl}
                  muted
                  playsInline
                  preload="metadata"
                />
              )
              : (
                <img
                  className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                  src={photoUrl}
                  alt={`Project photo ${index + 1}`}
                  loading="lazy"
                />
              )}
          </button>
        ))}
      </div>

      <dialog
        className={styles.dialog}
        ref={dialogRef}
        onClick={event => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        onClose={() => setIsOpen(false)}
        aria-label={`Media ${selectedIndex + 1} of ${photoUrls.length}`}
      >
        <div className="relative h-full w-full">
          {isOpen && (isVideo(photoUrls[selectedIndex])
            ? (
              <video
                className={styles.image}
                src={photoUrls[selectedIndex]}
                autoPlay
                muted
                playsInline
                controls
                key={photoUrls[selectedIndex]}
              />
            )
            : (
              <img
                className={styles.image}
                src={photoUrls[selectedIndex]}
                alt={`Project photo ${selectedIndex + 1} of ${photoUrls.length}`}
                loading="lazy"
              />
            ))}
          <button
            className="absolute right-0 top-0 m-2 h-10 w-10 rounded-full bg-black/70 text-2xl text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-white"
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close photo"
          >
            &times;
          </button>
          {photoUrls.length > 1 && (
            <>
              <button
                className="absolute left-0 top-1/2 ml-2 h-12 w-10 -translate-y-1/2 rounded bg-black/70 text-3xl text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-white"
                type="button"
                onClick={() => moveSelection(-1)}
                aria-label="Previous photo"
              >
                &lsaquo;
              </button>
              <button
                className="absolute right-0 top-1/2 mr-2 h-12 w-10 -translate-y-1/2 rounded bg-black/70 text-3xl text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-white"
                type="button"
                onClick={() => moveSelection(1)}
                aria-label="Next photo"
              >
                &rsaquo;
              </button>
            </>
          )}
          <p className="absolute bottom-0 left-1/2 mb-2 -translate-x-1/2 rounded bg-black/70 px-3 py-1 text-sm text-white">
            {selectedIndex + 1} / {photoUrls.length}
          </p>
        </div>
      </dialog>
    </section>
  );
}

export function isVideo(url: string) {
  return url.split(/[?#]/, 1)[0].toLowerCase().endsWith(".mp4");
}
