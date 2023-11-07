// Importation des dépendances nécessaires pour effectuer les tests.
import React from 'react';
import { render, screen } from '@testing-library/react';
import { TasksContext } from '../../utils/contexts/taskContext';
import CompletedTasks from './index';

// Groupe de tests décrivant le comportement attendu du composant `CompletedTasks`.
describe('CompletedTasks', () => {
    // Fonction d'assistance pour rendre le composant `CompletedTasks` dans un contexte de test.
    // Cela permet d'isoler le test et de fournir des données factices au contexte pour le test.
    const renderWithTasksContext = (taskList) => {
        return render(
            <TasksContext.Provider value={{ tasks: taskList }}>
                <CompletedTasks />
            </TasksContext.Provider>
        );
    };

    // Premier test : vérification que le composant ne rend rien quand il n'y a pas de tâches terminées.
    test('it should render no tasks when there are no completed tasks', () => {
        // On rend le composant avec une liste de tâches où aucune n'est terminée.
        renderWithTasksContext([{ id: 1, text: 'Task 1', completed: false }]);
        // On s'attend à ce que la tâche "Task 1" ne soit pas présente dans le document.
        expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
    });

    // Deuxième test : vérification que les tâches terminées sont bien rendues.
    test('it should render completed tasks', () => {
        // On rend le composant avec une liste de tâches mixte : terminées et non terminées.
        const tasks = [
            { id: 1, text: 'Task 1', completed: false },
            { id: 2, text: 'Task 2', completed: true },
            { id: 3, text: 'Task 3', completed: true }
        ];
        renderWithTasksContext(tasks);
        // On s'attend à ce que les tâches terminées ("Task 2" et "Task 3") soient présentes dans le document.
        expect(screen.getByText('Task 2')).toBeInTheDocument();
        expect(screen.getByText('Task 3')).toBeInTheDocument();
    });

    // Troisième test : vérification que les tâches non terminées ne sont pas rendues.
    test('it should not render incomplete tasks', () => {
        // On rend le composant avec une tâche terminée et une non terminée.
        const tasks = [
            { id: 1, text: 'Task 1', completed: false },
            { id: 2, text: 'Task 2', completed: true }
        ];
        renderWithTasksContext(tasks);
        // On s'attend à ce que la tâche non terminée ("Task 1") ne soit pas présente dans le document.
        expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
    });

    // Quatrième test : vérification que le rendu du composant correspond à un instantané (snapshot) précédemment enregistré.
    // C'est utile pour détecter des changements inattendus dans le rendu du composant.
    test('it should match snapshot with completed tasks', () => {
        // On rend le composant avec deux tâches terminées.
        const tasks = [
            { id: 1, text: 'Task 1', completed: true },
            { id: 2, text: 'Task 2', completed: true }
        ];
        // On obtient le fragment du document rendu pour le comparaison avec le snapshot.
        const { asFragment } = renderWithTasksContext(tasks);
        // On s'attend à ce que ce fragment correspond au snapshot.
        expect(asFragment()).toMatchSnapshot();
    });
});
