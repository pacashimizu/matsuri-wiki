import firebase from 'firebase/app';

export const getEvents = async () => {
  const eventsSnapshot = await firebase.firestore().collection('events').orderBy('createdAt', 'desc').get();
  const { docs } = eventsSnapshot;
  const storage = firebase.storage();
  
  const events = [];
  for (let i = 0; i < docs.length; i += 1) {
    const doc = docs[i];
    const { eventImageLocation, eventTitle, eventPref, eventOrigin } = doc.data();
    
    const image = await storage.ref(eventImageLocation).getDownloadURL();
    
    events.push({
      id: doc.id,
      title: eventTitle,
      image,
      prefecture: eventPref,
      origin: eventOrigin,
    });
  }
  return events;
};

export const postEvent = async (title, image, encoded, prefecture, origin) => {
  let addEvent = null;
  if (!image) {
    // ファイルが選択されていないなら何もしない
    return null;
  }
  
  const eventTitle = title;
  const filename = image.name;
  const eventImageLocation = `event-images/${filename}`;
  const eventPref = prefecture;
  const eventOrigin = origin;
  
  // firestore に送るデータ
  const eventData = {
    eventTitle,
    eventImageLocation,
    eventPref,
    eventOrigin,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  };
  
  await firebase
    .storage().ref(eventImageLocation).put(image) // Storageへファイルアップロードを実行
    .then(() => {
      const docRef = firebase.firestore().collection('events').doc();
        
      docRef.set(eventData);
      addEvent = {
        id: docRef.id,
        title: eventTitle,
        image: encoded,
        prefecture: eventPref,
        origin: eventOrigin,
      };
    });
    
  return addEvent;
};