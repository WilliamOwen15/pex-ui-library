/**
 * Utility functions for working with video URLs from various sources
 */

// Regex patterns for Google Drive URL formats
const FILE_ID_PATTERN = /\/file\/d\/([^/]+)/;
const QUERY_ID_PATTERN = /[?&]id=([^&]+)/;

/**
 * @deprecated Google Drive does not support CORS headers required for video embedding.
 * Videos will fail to load with CORS errors in browsers.
 * Use the /public folder approach or a proper video CDN instead.
 *
 * Converts a Google Drive share URL to a direct video streaming URL
 *
 * @param url - Google Drive share URL (e.g., https://drive.google.com/file/d/FILE_ID/view)
 * @returns Direct streaming URL (NOTE: Will not work due to CORS restrictions)
 */
export function getGoogleDriveVideoUrl(url: string): string {
  console.warn(
    "getGoogleDriveVideoUrl is deprecated: Google Drive does not support CORS for video embedding. Use /public folder or a video CDN instead."
  );

  // Extract file ID from various Google Drive URL formats
  let fileId: string | null = null;

  // Format 1: https://drive.google.com/file/d/FILE_ID/view
  const viewMatch = url.match(FILE_ID_PATTERN);
  if (viewMatch) {
    fileId = viewMatch[1];
  }

  // Format 2: https://drive.google.com/open?id=FILE_ID
  const openMatch = url.match(QUERY_ID_PATTERN);
  if (openMatch) {
    fileId = openMatch[1];
  }

  // Format 3: Already a direct download URL (drive.google.com)
  const downloadMatch = url.match(QUERY_ID_PATTERN);
  if (url.includes("uc?export=download") && downloadMatch) {
    return url; // Already in correct format
  }

  // Format 4: Already using drive.usercontent.google.com
  if (url.includes("drive.usercontent.google.com") && downloadMatch) {
    return url; // Already in correct format
  }

  if (!fileId) {
    throw new Error("Invalid Google Drive URL: Could not extract file ID");
  }

  // Return direct download URL using drive.usercontent.google.com
  // NOTE: This will not work for video embedding due to CORS restrictions
  return `https://drive.usercontent.google.com/download?id=${fileId}&export=download`;
}

/**
 * Gets the video URL for local videos in the /public folder
 *
 * @param filename - Filename relative to /public folder (e.g., "videos/demo.mp4")
 * @returns Absolute path to the video file
 *
 * @example
 * const videoUrl = getPublicVideoUrl("videos/project-exodus.mp4")
 * // Returns: "/videos/project-exodus.mp4"
 */
export function getPublicVideoUrl(filename: string): string {
  // Ensure filename starts with /
  return filename.startsWith("/") ? filename : `/${filename}`;
}

/**
 * Validates if a URL is a valid video URL
 *
 * @param url - URL to validate
 * @returns true if the URL appears to be a valid video URL
 */
export function isValidVideoUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);

    // Check for common video file extensions
    const videoExtensions = [".mp4", ".webm", ".ogg", ".mov", ".avi"];
    const hasVideoExtension = videoExtensions.some((ext) =>
      parsedUrl.pathname.toLowerCase().endsWith(ext)
    );

    // Check for known video hosting domains
    const videoHosts = [
      "youtube.com",
      "youtu.be",
      "vimeo.com",
      "stream.mux.com",
    ];
    const isKnownHost = videoHosts.some((host) =>
      parsedUrl.hostname.includes(host)
    );

    return hasVideoExtension || isKnownHost;
  } catch {
    // If URL parsing fails, check if it's a relative path
    return url.startsWith("/") && url.includes(".");
  }
}

/**
 * Gets the appropriate CORS setting for a video URL
 *
 * @param url - Video URL
 * @returns CORS setting ("anonymous", "use-credentials", or undefined)
 */
export function getVideoCorsMode(
  url: string
): "anonymous" | "use-credentials" | undefined {
  try {
    const parsedUrl = new URL(url);
    const currentHost =
      typeof window !== "undefined" ? window.location.hostname : "";

    // Same origin - no CORS needed
    if (parsedUrl.hostname === currentHost) {
      return undefined;
    }

    // For external sources, use anonymous by default
    return "anonymous";
  } catch {
    // Relative URL - no CORS needed
    return undefined;
  }
}
