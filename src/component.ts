/* eslint-disable */
class Component {
  // @ts-ignore
  protected readonly elem: Element;

  /**
   * Generic constructor for all components
   * @constructor
   * @param {Element} el
   * @param {Object} _
   */

  public constructor(ClassDef, elem, { options = [] }) {
    if (!(elem instanceof Element)) {
      console.log(`${elem} is not an HTML Element`);
    }

    this.elem = elem;
  }

  /**
   * Initializes components
   * @param {class} classDef
   * @param {Element | NodeList} els
   * @param {Object} options
   */
  /* eslint-disable */
  static create(ClassDef, elem, options) {
    let instances = null;
    if (elem instanceof Element) {
      instances = new ClassDef(elem, options);
    } else if (!!elem && (elem instanceof NodeList)) {
      const instancesArr: any[] = [];
      for (let i = 0; i < elem.length; i += 1) {
        instancesArr.push(new ClassDef(elem[i], options));
      }
      // @ts-ignore
      instances = instancesArr;
    } else {
      instances = new ClassDef(null, options);
    }

    return instances;
  }
}

export default Component;
