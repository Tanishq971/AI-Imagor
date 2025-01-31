import { type ClassValue, clsx } from "clsx";
import qs from "qs";
import { twMerge } from "tailwind-merge";

import { aspectRatioOptions } from "@/constants";

// Type to describe the image object
interface Image {
  aspectRatio?: keyof typeof aspectRatioOptions; // If aspectRatio is always one of the options, use this type.
  width?: number;
  height?: number;
}

// Utility function to merge class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Error handling
export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    console.error(error.message);
    throw new Error(`Error: ${error.message}`);
  } else if (typeof error === "string") {
    console.error(error);
    throw new Error(`Error: ${error}`);
  } else {
    console.error(error);
    throw new Error(`Unknown error: ${JSON.stringify(error)}`);
  }
};

// Placeholder loader
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#7986AC" offset="20%" />
      <stop stop-color="#68769e" offset="50%" />
      <stop stop-color="#7986AC" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#7986AC" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite" />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export const dataUrl = `data:image/svg+xml;base64,${toBase64(
  shimmer(1000, 1000)
)}`;

// Form URL query utility
export const formUrlQuery = ({
  searchParams,
  key,
  value,
}: FormUrlQueryParams) => {
  const params = { ...qs.parse(searchParams.toString()), [key]: value };
  return `${window.location.pathname}?${qs.stringify(params, {
    skipNulls: true,
  })}`;
};

// Remove keys from URL query
export function removeKeysFromQuery({
  searchParams,
  keysToRemove,
}: RemoveUrlQueryParams) {
  const currentUrl = qs.parse(searchParams);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  Object.keys(currentUrl).forEach(
    (key) => currentUrl[key] == null && delete currentUrl[key]
  );

  return `${window.location.pathname}?${qs.stringify(currentUrl)}`;
}

// // Debounce utility
// export const debounce = (func: (...args: any[]) => void, delay: number) => {
//   let timeoutId: NodeJS.Timeout | null;
//   return (...args: any[]) => {
//     if (timeoutId) clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => func.apply(null, args), delay);
//   };
// };

// Get image size based on aspect ratio and dimension
export type AspectRatioKey = keyof typeof aspectRatioOptions;
export const getImageSize = (
  type: string,
  image: Image, // Use a specific type instead of `any`
  dimension: "width" | "height"
): number => {
  if (type === "fill" && image.aspectRatio) {
    return (
      aspectRatioOptions[image.aspectRatio]?.[dimension] ||
      1000
    );
  }
  return image?.[dimension] || 1000;
};

// Download image utility
export const download = (url: string, filename: string) => {
  if (!url) {
    throw new Error("Resource URL not provided! You need to provide one");
  }

  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const blobURL = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobURL;

      if (filename && filename.length)
        a.download = `${filename.replace(" ", "_")}.png`;
      document.body.appendChild(a);
      a.click();
    })
    .catch((error) => console.log({ error }));
};

// Deep merge objects utility
// export const deepMergeObjects = <T extends Record<string, any>>(
//   obj1: T,
//   obj2: Partial<T>
// ): T => {
//   if (!obj2) return obj1;

//   let output = { ...obj1 } as T;

//   for (const key of Object.keys(obj2) as Array<keyof T>) {
//     const obj1Value = obj1[key];
//     const obj2Value = obj2[key];

//     // Check if both values are objects and merge them
//     if (
//       obj1Value &&
//       typeof obj1Value === "object" &&
//       obj2Value &&
//       typeof obj2Value === "object"
//     ) {
//       // Recursively merge objects
//       output[key] = deepMergeObjects(obj1Value as Record<string, any>, obj2Value as Record<string, any>) as T[keyof T];
//     } else {
//       // Direct assignment if not objects
//       output[key] = obj2Value as T[keyof T];
//     }
//   }

//   return output;
// };


// Ensure proper type for obj1 and obj2 instead of using 'any'
export const deepMergeObjects = <T extends Record<string, unknown>>(
  obj1: T,
  obj2: Partial<T>
): T => {
  if (!obj2) return obj1;

  const output = { ...obj1 } as T;  // Use 'const' here since 'output' is not reassigned

  // Ensure key type is correctly defined
  for (const key of Object.keys(obj2) as Array<keyof T>) {
    const obj1Value = obj1[key];
    const obj2Value = obj2[key];

    // Ensure obj1Value and obj2Value are objects before recursive merge
    if (
      obj1Value &&
      typeof obj1Value === "object" &&
      obj2Value &&
      typeof obj2Value === "object"
    ) {
      // Correctly type the recursive call
      output[key] = deepMergeObjects(obj1Value as Record<string, unknown>, obj2Value as Record<string, unknown>) as T[keyof T];
    } else {
      // Direct assignment for non-objects
      output[key] = obj2Value as T[keyof T];
    }
  }

  return output;
};

// Replacing .apply() with spread operator
export const debounce = (func: (...args: unknown[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout | null;
  return (...args: unknown[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay); // Using the spread operator here
  };
};
