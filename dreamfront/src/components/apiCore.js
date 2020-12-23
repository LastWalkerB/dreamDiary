import queryString from 'query-string';
import {API} from '../config';

export const getDreams = () => {
    return fetch(`http://localhost:8000/dreams/`, {
        method: "GET"
    })
    .then(res => {
        return res.json();
    })
    .catch(err => {
        console.log(err);
    });
}

export const getDreamDiaries = () => {

  return fetch(`http://localhost:8000/dreams/diaries`, {
      method: "GET"
  })
  .then(res => {
      return res.json();
  })
  .catch(err => {
      console.log(err);
  });

}

export const getDreamsByOwner =(name) => {

    return fetch(`http://localhost:8000/dreams/${name}`, {
        method: "GET"
    })
    .then(res => {
        return res.json();
    })
    .catch(err => {
        console.log(err);
    });
}

export const getDreamsByTitle = (name, title) => {
      return fetch(`http://localhost:8000/dreams/title`, {
          method: "POST",
          body: JSON.stringify({owner: name, title: title})
      })
      .then(res => {
          return res.json();
      })
      .catch(err => {
          console.log(err);
      });
}

export const makeDreamDiary = (data) => {
  return fetch(`http://localhost:8000/dreams/mkdir`, {
      method: "POST",
      body: JSON.stringify(data)
  })
  .then(res => {
      return res.json();
  })
  .catch(err => {
      console.log(err);
  });
}

export const addDream = (data) => {
  return fetch(`http://localhost:8000/dreams/add`, {
      method: "POST",
      body: JSON.stringify(data)
  })
  .then(res => {
      return res.json();
  })
  .catch(err => {
      console.log(err);
  });
}

export const deleteDream = (data) => {
  return fetch(`http://localhost:8000/dreams/delete/dream`, {
      method: "DELETE",
      body: JSON.stringify(data)
  })
  .then(res => {
      return res.json();
  })
  .catch(err => {
      console.log(err);
  });
}

export const updateDream = (data) => {
  return fetch(`http://localhost:8000/dreams/update`, {
      method: "POST",
      body: JSON.stringify(data)
  })
  .then(res => {
      return res.json();
  })
  .catch(err => {
      console.log(err);
  });
}
