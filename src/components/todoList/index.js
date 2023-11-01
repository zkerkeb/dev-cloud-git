// Importation des fonctions et des hooks nécessaires depuis React.
// `useCallback` pour mémoriser les fonctions, `useMemo` pour mémoriser les valeurs,
// et `useState` pour gérer l'état local du composant.
import React, { useCallback, useMemo, useState } from 'react';

// Importation du contexte des tâches. Le contexte permet de partager des données
// entre différents composants sans avoir à les passer explicitement via les props.
import { TasksContext } from '../../utils/contexts/taskContext';

// Importation du custom hook `useTasks`, qui contient la logique de gestion des tâches.
import useTasks from '../../utils/hooks/useTasks';

// Importation du composant `CompletedTasks` qui affiche les tâches terminées.
import CompletedTasks from '../completedTasks';

const TodoList = () => {
    // Utilisation du custom hook `useTasks` pour gérer l'état et les actions des tâches.
    const { tasks, addTask, toggleTask, deleteTask } = useTasks();

    // Gestion de l'entrée de la nouvelle tâche par l'utilisateur.
    const [taskInput, setTaskInput] = useState('');

    // Gestion de l'état du filtre pour afficher soit toutes les tâches,
    // soit seulement celles complétées ou non complétées.
    const [filter, setFilter] = useState('all'); // all, completed, notCompleted

    // Utilisation de `useMemo` pour filtrer les tâches en fonction de la valeur du filtre.
    // Cette optimisation garantit que le filtrage ne se fait que si les tâches ou le filtre changent.
    const filteredTasks = useMemo(() => {
        if (filter === 'completed') return tasks.filter(task => task.completed);
        if (filter === 'notCompleted') return tasks.filter(task => !task.completed);
        return tasks;
    }, [filter, tasks]);

    // Création d'une fonction pour ajouter une nouvelle tâche.
    // `useCallback` garantit que cette fonction n'est pas recréée à chaque rendu, 
    // sauf si `taskInput` ou `addTask` change.
    const handleAddTask = useCallback(() => {
        addTask(taskInput);
        setTaskInput('');
    }, [taskInput, addTask]);

    return (
        // Fournit la liste des tâches et les fonctions de gestion à tous les composants enfants.
        <TasksContext.Provider value={{ tasks, addTask, toggleTask, deleteTask }}>
            <div className="App">
                {/* Champ d'entrée pour ajouter une nouvelle tâche */}
                <input value={taskInput} onChange={e => setTaskInput(e.target.value)} />
                <button onClick={handleAddTask}>Add</button>
                {/* Sélecteur pour choisir le filtre d'affichage des tâches */}
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="notCompleted">Not Completed</option>
                </select>
                {/* Liste des tâches filtrées */}
                <ul>
                    {filteredTasks.map(task => (
                        <li key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                            {task.text}
                            {/* Boutons pour basculer l'état de la tâche et pour la supprimer */}
                            <button onClick={() => toggleTask(task.id)}>Toggle</button>
                            <button onClick={() => deleteTask(task.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
                {/* Composant pour afficher les tâches terminées */}
                {/* Vous remarquerez qu'on envoi pas de tache en props, car Completed Task se sert de context 
                    pour recupérer les tâches.
                */}
                <CompletedTasks />
            </div>
        </TasksContext.Provider>
    );
}

export default TodoList;
