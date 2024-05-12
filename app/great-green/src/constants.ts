import * as yup from 'yup';

export const loginValidationSchema = yup.object({
  username: yup.string().email("Invalid email").required(),
  password: yup.string().required("Please enter a valid password !")
  .min(8, 'Add 8 chars minimum.')
  .matches(
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    'At least one letter and one number'
  )
})

export const ADDON_ICONS = {
  PLUMBING: "/icons/plumbing.png", 
  SICKLE: "/icons/sickle.png",
  PEAT: "/icons/peat.png",
  POT: "/icons/pot1.png"
};

export const PLANT_ICONS = {
  "TREE": "/icons/tree.png",
  "HERB": "/icons/herb.png",
  "SHURB": "/icons/shurb.png",
  "GRASS": "/icons/grass.png",
  "FERN": "/icons/fern.png",
};
