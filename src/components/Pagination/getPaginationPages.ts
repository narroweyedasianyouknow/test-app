const MAX_NAVIGATION_BUTTON_COUNT = 5;
const START_COUNT = 1;

export function getPaginationPages(
      maxPage: number,
      currentPage: number
): number[] {
      const values: number[] = [];
      let lowerBound = Math.max(START_COUNT, currentPage - 2);
      let upperBound = Math.min(currentPage + 2, maxPage);

      for (let i = lowerBound; i <= upperBound; i++) {
            values.push(i);
      }

      while (values.length < MAX_NAVIGATION_BUTTON_COUNT) {
            if (upperBound < maxPage) {
                  values.push(upperBound + 1);
                  upperBound++;
            } else if (lowerBound > 1) {
                  values.unshift(lowerBound - 1);
                  lowerBound--;
            } else {
                  break;
            }
      }

      return values;
}
