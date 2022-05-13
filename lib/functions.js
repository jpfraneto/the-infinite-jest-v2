export default function getNextPlayedMedia(allMedia, previousPlayedArray) {
  try {
    const filteredMedia = allMedia.filter(x => {
      return previousPlayedArray.includes(x.id);
    });
    if (filteredMedia.length === 0) {
      if (allMedia.length === 1) {
        return allMedia[0];
      }
      return getRandomMedia(
        allMedia.filter(
          x => x._id !== previousPlayedArray[previousPlayedArray.length - 1]
        )
      );
    }
    const theRandomFromThese = getRandomMedia(filteredMedia);
    return theRandomFromThese;
  } catch (error) {
    console.log('there was an error0,', error);
    return {};
  }
}

function getRandomMedia(allMediaElements) {
  const length = allMediaElements.length;
  const randomIndex = Math.floor(length * Math.random());
  return allMediaElements[randomIndex];
}
