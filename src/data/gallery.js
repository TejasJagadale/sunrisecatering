// Gallery data is derived from the central image config (src/config/images.js).
// To use real photos, edit GALLERY_IMAGES there – nothing else needs to change.
import { GALLERY_IMAGES, GALLERY_FILTERS } from '../config/images';

export const GALLERY = GALLERY_IMAGES;
export const FILTERS = GALLERY_FILTERS;

export const countFor = (filterId) =>
  filterId === 'all' ? GALLERY.length : GALLERY.filter((item) => item.category === filterId).length;
