import * as yup from "yup";

const validFileExtensions = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] };

export function isValidFileType(fileName, fileType) {
  return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
}

export const createBadgeSchema = yup.object({
  name: yup.string().required(),
  file: yup.mixed()
    .required("Badge logo is required")
    .test("is-valid-type", "Not a valid image type",
      value => isValidFileType(value && value.filename.toLowerCase(), "image"))
});

export const updateBadgeSchema = yup.object({
  name: yup.string(),
  file: yup.mixed()
    .test("is-valid-type", "Not a valid image type",
      value => isValidFileType(value && value.filename.toLowerCase(), "image"))
});