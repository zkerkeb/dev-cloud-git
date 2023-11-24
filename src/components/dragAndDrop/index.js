// Importation des hooks et composants nécessaires depuis React et react-beautiful-dnd
import React, {useCallback, useState} from 'react';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';

// Fonction pour générer une liste d'éléments à déplacer (drag and drop).
// 'count' détermine le nombre d'éléments.
const getItems = count =>
  Array.from({length: count}, (_, k) => ({
    id: `item-${k}`, // Chaque élément a un identifiant unique.
    content: `item ${k}`, // Contenu de chaque élément.
  }));

// Fonction pour réorganiser la liste lorsqu'un élément est déplacé.
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1); // Retire l'élément déplacé.
  result.splice(endIndex, 0, removed); // Insère l'élément à sa nouvelle position.
  return result; // Renvoie la liste réorganisée.
};

const grid = 8; // Définit la taille de la grille pour le style.

// Style des éléments déplaçables.
const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none', // Désactive la sélection de l'utilisateur.
  padding: grid * 2, // Padding autour de chaque élément.
  margin: `0 0 ${grid}px 0`, // Marge autour de chaque élément.
  borderRadius: isDragging ? 40 : 0, // Bordure arrondie.
  background: isDragging ? 'lightgreen' : 'grey', // Change la couleur de fond lors du déplacement.
  ...draggableStyle, // Applique les styles supplémentaires nécessaires pour le drag and drop.
});

// Style du conteneur où les éléments peuvent être déposés.
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey', // Change la couleur de fond si un élément est survolé.
  padding: grid, // Padding autour du conteneur.
  width: 250, // Largeur du conteneur.
});

// Composant principal pour le drag and drop.
const DragAndDrop = () => {
  const [items, setItems] = useState(getItems(10)); // État initial des éléments.

  // Gère la fin du déplacement d'un élément.
  const onDragEnd = useCallback(
    result => {
      if (!result.destination) {
        return; // Si l'élément n'est pas déplacé dans une nouvelle position, ne rien faire.
      }
      const newItems = reorder(
        items,
        result.source.index,
        result.destination.index,
      );
      setItems(newItems); // Met à jour l'état avec la nouvelle liste d'éléments.
    },
    [items], // Dépendances du useCallback.
  );

  // Rendu du composant.
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}>
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style,
                    )}>
                    {item.content}
                    {/* ÷/{* / Affiche le contenu de chaque élément. */}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {/* // Placeholder nécessaire pour react-beautiful-dnd. */}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragAndDrop;
