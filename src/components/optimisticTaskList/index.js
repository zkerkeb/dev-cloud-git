import React, {useState} from 'react';

const OptimisticTaskList = () => {
  const [tasks, setTasks] = useState([
    {id: 1, title: 'Tâche 1', completed: false},
    {id: 2, title: 'Tâche 2', completed: false},
    {id: 3, title: 'Tâche 3', completed: false},
    {id: 4, title: 'Tâche 4', completed: false},
  ]);

  const markTaskAsCompleted = async taskId => {
    // Mise à jour optimiste
    const newTasks = tasks.map(task =>
      task.id === taskId ? {...task, completed: !task.completed} : task,
    );
    setTasks(newTasks);

    try {
      // Envoi de la requête de mise à jour au serveur
      await updateTaskOnServer(taskId);
    } catch (error) {
      // En cas d'erreur, restaurez l'état précédent
      setTasks(tasks);
      alert('Erreur lors de la mise à jour de la tâche');
    }
  };

  return (
    <div>
      {tasks.map(task => (
        <div key={task.id}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => markTaskAsCompleted(task.id)}
          />
          {task.title}
        </div>
      ))}
    </div>
  );
};

// Fonction simulée pour mettre à jour la tâche sur le serveur
function updateTaskOnServer(taskId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve();
      } else {
        reject(new Error('Échec de la mise à jour'));
      }
    }, 1000);
  });
}

export default OptimisticTaskList;
