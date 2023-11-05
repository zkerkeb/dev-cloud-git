// Importation des outils nécessaires à partir des bibliothèques de test.
import { act } from 'react-dom/test-utils';
import { renderHook } from '@testing-library/react-hooks';

import useTasks from './path-to-your-hook';  // Remplacez par le chemin d'accès réel de votre hook.

describe('useTasks Hook', () => {
    // Avant chaque test, nous simulons les méthodes `getItem` et `setItem` de `localStorage`
    // pour éviter d'utiliser le `localStorage` réel pendant les tests.
    beforeEach(() => {
        Object.defineProperty(window, 'localStorage', {
            value: {
                getItem: jest.fn(),
                setItem: jest.fn()
            },
            writable: true
        });
    });

    // Test pour vérifier le chargement des tâches depuis le local storage.
    it('should load tasks from local storage on initial render', () => {
        // Simuler une liste de tâches dans le local storage.
        window.localStorage.getItem.mockReturnValueOnce(JSON.stringify([{ id: 1, text: 'Task 1', completed: false }]));

        const { result } = renderHook(() => useTasks());

        expect(result.current.tasks).toEqual([{ id: 1, text: 'Task 1', completed: false }]);
    });

    // Test pour vérifier l'ajout d'une nouvelle tâche.
    it('should add a new task', () => {
        const { result } = renderHook(() => useTasks());

        act(() => {
            result.current.addTask('New Task');
        });

        expect(result.current.tasks[0].text).toEqual('New Task');
        expect(window.localStorage.setItem).toHaveBeenCalled();
    });

    // Test pour basculer l'état d'une tâche.
    it('should toggle a task', () => {
        const { result } = renderHook(() => useTasks());

        act(() => {
            result.current.addTask('Toggle Task');
            result.current.toggleTask(result.current.tasks[0].id);
        });

        expect(result.current.tasks[0].completed).toBe(true);
    });

    // Test pour supprimer une tâche.
    it('should delete a task', () => {
        const { result } = renderHook(() => useTasks());

        act(() => {
            result.current.addTask('Task to Delete');
            result.current.deleteTask(result.current.tasks[0].id);
        });

        expect(result.current.tasks.length).toBe(0);
    });
});

