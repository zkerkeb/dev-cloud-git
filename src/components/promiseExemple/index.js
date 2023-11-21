import React, {useState, useEffect} from 'react';

const PromiseFunc = new Promise((resolve, reject) => {
  // Opération asynchrone
  const succeed = false; // Simule le résultat d'une opération

  if (succeed) {
    resolve('Succès'); // Si l'opération réussit
  } else {
    reject('Échec'); // Si l'opération échoue
  }
});

const PromiseExemple = () => {
  const [data, setdata] = useState(null);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    PromiseFunc.then(resultat => {
      setdata(resultat);
    }).catch(erreur => {
      setErreur(erreur);
    });
  }, []);

  if (erreur) {
    return <div>Erreur : {erreur}</div>;
  }

  if (!data) {
    return <div>Chargement...</div>;
  }

  return <div>Données : {data}</div>;
};

export default PromiseExemple;
