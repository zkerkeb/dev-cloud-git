// Importation des fonctions nécessaires pour tester des hooks React.
import {act, renderHook} from '@testing-library/react-hooks';
// Importation du hook `useTasks` qui doit être testé.
import useTasks from './useTasks'; // Assurez-vous que le chemin d'accès est correct.

// `describe` permet de regrouper plusieurs tests relatifs au hook `useTasks`.
describe('useTasks Hook', () => {
  // `beforeEach` est une fonction qui est exécutée avant chaque test.
  // Ici, elle est utilisée pour simuler les méthodes `getItem` et `setItem` de `localStorage`.
  beforeEach(() => {
    // Mock de `localStorage.getItem` pour retourner un tableau vide sous forme de chaîne JSON.
    Storage.prototype.getItem = jest.fn(() => JSON.stringify([]));
    // Mock de `localStorage.setItem` pour qu'il puisse être surveillé pendant les tests.
    Storage.prototype.setItem = jest.fn();
  });

  // Test pour s'assurer que le hook charge correctement les tâches depuis `localStorage`.
  it('should load tasks from local storage on initial render', () => {
    // Utilisation de `renderHook` pour exécuter le hook `useTasks`.
    const {result} = renderHook(() => useTasks());
    // Vérification que `tasks` est initialisé à un tableau vide.
    expect(result.current.tasks).toEqual([]);
  });

  // Test pour vérifier que le hook peut ajouter une nouvelle tâche.
  it('should add a new task', () => {
    // On exécute à nouveau le hook pour ce test.
    const {result} = renderHook(() => useTasks());

    // `act` est utilisé pour exécuter des mises à jour de l'état qui pourraient avoir des effets.
    act(() => {
      // Ajout d'une nouvelle tâche appelée 'New Task'.
      result.current.addTask('New Task');
    });

    // Vérification que la nouvelle tâche a bien été ajoutée.
    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].text).toBe('New Task');
    // Vérification que `localStorage.setItem` a été appelé avec les bonnes données.
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'tasks',
      JSON.stringify(result.current.tasks),
    );
  });

  // Test pour vérifier que le hook peut changer l'état d'une tâche (complétée ou non).
  it('should toggle a task', () => {
    // On exécute le hook.
    const {result} = renderHook(() => useTasks());

    // Ajout d'une tâche qui sera basculée.
    act(() => {
      result.current.addTask('Toggle Task');
    });

    // On sauvegarde l'ID de la nouvelle tâche pour l'utiliser dans le test.
    const taskId = result.current.tasks[0].id;

    // On bascule l'état de la tâche.
    act(() => {
      result.current.toggleTask(taskId);
    });

    // Vérification que l'état de la tâche a bien été modifié.
    expect(result.current.tasks[0].completed).toBe(true);
  });

  // Test pour vérifier que le hook peut supprimer une tâche.
  it('should delete a task', () => {
    // On exécute le hook.
    const {result} = renderHook(() => useTasks());

    // Ajout d'une tâche qui sera ensuite supprimée.
    act(() => {
      result.current.addTask('Task to Delete');
    });

    // On sauvegarde l'ID de la nouvelle tâche pour l'utiliser dans le test de suppression.
    const taskId = result.current.tasks[0].id;

    // On supprime la tâche.
    act(() => {
      result.current.deleteTask(taskId);
    });

    // Vérification que la tâche a bien été supprimée.
    expect(result.current.tasks).toHaveLength(0);
  });
});
