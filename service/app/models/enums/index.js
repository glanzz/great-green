class Enum {
  constructor(values) {
    this.values = values;
    for(let value of values ) {
      this[`${value}`.toUpperCase()] = value;
    }
  }
  getValues() {
    return this.values;
  }
}

export const GENDER = new Enum(["MALE", "FEMALE", "OTHERS"]);
export const CENTER_TYPE = new Enum(["UN", "AFFILIATION"]);
export const JOURNEY_STATUS = new Enum(["PENDING", "WAITING", "PICKUP_READY", "IN_PROGRESS", "COMPLETED"]);
export const LEVEL = new Enum(["HARD", "MEDIUM", "EASY"]);
export const CONTRIBUTION_STATUS = new Enum(["PENDING", "COMPLETED"]);
export const AFFILIATION_STATUS = new Enum(["ACTION_REQUIRED", "WAITING", "PENDING_PICKUP", "COMPLETED"]);
export const YIELD_UNIT = new Enum(["POUND", "COUNT", "GALLON"]);
export const PLANT_TYPE = new Enum(["TREE", "HERB", "SHURB", "GRASS", "FERN"]);
export const ADDON_TYPE = new Enum(["PLUMBING", "SICKLE", "PEAT", "POT"]);
export const POINT = "Point";

/**
 * Map the journey status of associated affiliation to the status of affiliation
 * Affiliation plays a role only until journey is in pickedup state
 * after that journey is independent of affiliation
 */
export const AFFILIATION_JOURNEY_STATUS_MAP = {
  [JOURNEY_STATUS.PENDING]: AFFILIATION_STATUS.ACTION_REQUIRED,
  [JOURNEY_STATUS.WAITING]: AFFILIATION_STATUS.WAITING,
  [JOURNEY_STATUS.PICKUP_READY]: AFFILIATION_STATUS.PENDING_PICKUP,
  [JOURNEY_STATUS.IN_PROGRESS]: AFFILIATION_STATUS.COMPLETED,
  [JOURNEY_STATUS.COMPLETED]: AFFILIATION_STATUS.COMPLETED,
};


export const INVALID_USER_UPDATE_JOURNEY_STATUS = [JOURNEY_STATUS.PENDING, JOURNEY_STATUS.WAITING, JOURNEY_STATUS.PICKUP_READY]
