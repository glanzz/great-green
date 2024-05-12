import { CENTER_TYPE } from "./models/enums/index.js";
import centerService from "./services/center-service.js";
import saplingKitService from "./services/sapling-kit-service.js";


/**
 * This is an assignable entity which would be used to create the journey with
 * It represents which kit is assigned and who is its provider(center)
 * The weight is used to find the best of them
 */
class Kit {
  constructor(kit, weight, provider) {
    this.kit = kit;
    this.weight = weight;
    this.provider = provider;
    this.children = null;
  }

  getWeight() {
    return this.weight;
  }
}
/**
 * Center represents the center which can have multiple kits in thier inventory
 * The center calculates and creates kit as its child and determines the best kit to be assigned
 * The best kit is determined based on the count in level, count in inventory and the preferred gender
 * Best center is one which has best weights of the kits in inventory that match user specification
 */
class Center {
  constructor(center, gender, level) {
    this.center = center;
    this.gender = gender;
    this.level = level;
  }

  getWeight() {
    // Scale the weight 10 times for affiliation requests to promote affiliations
    const AFFILIATION_SCALING_FACTOR = (this.center.type == CENTER_TYPE.UN ? 1: 10);
    return AFFILIATION_SCALING_FACTOR * this.weight;
  }

  async build() {
    this.weight = 0;
    this.children = [];
    this.center.kits.forEach(async (centerKit) => {
      const kit = await saplingKitService.find(centerKit.kit_id);
      if(kit) {
        console.log("KIT LEVEL")
        console.log(kit.level)
        console.log(this.level)
        console.log(centerKit.count)
        let kitweight = (
          (2 * (kit.level == this.level) * centerKit.count) + 
          (1.5 * (kit.preferred_gender == this.gender))
        );
        this.children.push(new Kit(kit, kitweight, this.center))
        this.weight += kitweight;
      }
    })
  }
}


/**
 * Area determines the radial distance from X,Y and min and maxDistance from x,y
 * It determines the best center based center with max weight
 */
class Area{
  constructor(locationX, locationY, minDistance, maxDistance, weight, gender, level, blacklistCenters) {
    this.weight = weight;
    this.locationX = locationX;
    this.locationY = locationY;
    this.maxDistance = maxDistance;
    this.minDistance = minDistance;
    this.gender = gender;
    this.level = level;
    this.blacklistCenters = blacklistCenters;
  }

  getWeight() {
    let childrenWeight = 0;
    this.children.forEach(child => {
      childrenWeight += child.getWeight();
    });
    return this.weight * childrenWeight;
  }

  async build() {
    await this.getCenters();
  }

  async getCenters() {
    this.children = [];
    const centers = await centerService.findAssignableCenter(this.locationX, this.locationY, this.minDistance, this.maxDistance);

    for (const center of centers) {
      // Do not consider blacklisted centers while searching
      if (!this.blacklistCenters.includes(center._id)) {
        const centerTree = new Center(center, this.gender, this.level);
        await centerTree.build();
        this.children.push(centerTree);
      }
    }
    
  }
}

/**
 * Determines the best possible kit and provider for a journey based on user's location
 * It scans the area around the user incrementally and finds the best kit that he can pick up
 */
class Assigner {
  constructor(locationX, locationY, gender, level, blacklistCenters = []) {
    this.steps = [1000,2000,3000];
    this.locationX = locationX;
    this.locationY = locationY;
    this.gender = gender;
    this.level = level;
    this.blacklistCenters = blacklistCenters;
  }

  async build() {
    await this.getAreas();
  }

  async getAreas() {
    this.children = [];
    for(const weight in this.steps) {
      const minDistance = weight == 0 ? 0 : this.steps[weight-1];
      const areaTree = new Area(this.locationX, this.locationY, minDistance, this.steps[weight], (this.steps.length - weight), this.gender, this.level, this.blacklistCenters);
      await areaTree.build();
      this.children.push(areaTree)
    }
  }

  getBest(entity) {
    if(!entity) {
      return entity;
    }
    if (entity.children) {
      let bestChild = null;
      entity.children.forEach(child => {
        if (child.getWeight() >= (bestChild ? bestChild.getWeight() : 0)) {
          bestChild = child;
        }}
      );
      return bestChild && this.getBest(bestChild);
    }
    return entity;
  }

}


export default Assigner;
