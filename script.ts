// Création d'un jeu d'échecs 
// pion = 1 et 2 pour blanc et noir
// tour = 3 et 4 pour blanc et noir
// cavalier = 5 et 6 pour blanc et noir
// fou = 7 et 8 pour blanc et noir
// dame = 9 et 10 pour blanc et noir
// roi = 11 et 12 pour blanc et noir
// 0 = case vide

// div du plateau de jeux
let plateaudiv = document.getElementById('plateaudiv');

// Images des pièces
let Images = [
    ""
    , "img/pièce/pionblanc.png"
    , "img/pièce/pionnoir.png"
    , ""
    , ""
    , ""
    , ""
    , ""
    , ""
    , ""
    , ""
    , ""
    , ""
];


function PiecePlacement(table) {
    for (let i = 0; i < 8; i++) {
        table[6][i] = 1; // Pions blancs
        table[1][i] = 2; // Pions noirs
    }
}
function actualiserPlateau(table) {
    // Maintenant, on met à jour les Images en fonction du tableau
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            piecesImages[i][j].src = Images[table[i][j]]; // Met à jour la source de l'image

        }
    }
}

let first: { i: number, j: number } | null = null; // Stocke les coordonnées de la case sélectionnée
let selection: number = 0;

function DeplacerPion(i: number, j: number, table: number[][]) {
    if (selection === 0) {
        // Sélectionner un pion
        if (table[i][j] !== 0) { // Si la case n'est pas vide
            first = { i, j }; // Stocke les coordonnées de la case
            selection = 1; // Change l'état de sélection
            const selectedCase = piecesImages[i][j].parentElement; // Obtenir le parent div de l'image
            selectedCase.classList.add('caseSelectionnee'); // Ajouter la classe de sélection
        }
    } else if (selection === 1) {
        // Tentative de déplacement
        if (table[i][j] === 0) { // Si la case est vide
            // Déplace le pion
            table[i][j] = table[first.i][first.j]; // Déplace le pion vers la nouvelle case
            table[first.i][first.j] = 0; // Vide la case d'origine

            // Réinitialise la sélection
            selection = 0;
            

            // Actualise le plateau
            const previousCase = piecesImages[first.i][first.j].parentElement; // Obtenir le parent div de l'image
            previousCase.classList.remove('caseSelectionnee');
            first = null; // Réinitialise les coordonnées
            actualiserPlateau(table);
        } else {
            console.log("La case de destination n'est pas vide !");
        }
    }

}

// Création d'un tableau 8x8 pour le plateau de jeux
const plateau = new Array(8);
const piecesImages = new Array(8); // Tableau pour stocker les références des éléments img

for (let i = 0; i < 8; i++) {
    plateau[i] = new Array(8); // Crée une ligne
    piecesImages[i] = new Array(8); // Crée une ligne pour les Images

    // Crée une div pour la ligne
    let ligne = document.createElement('div');
    ligne.classList.add('ligne');
    for (let j = 0; j < 8; j++) {
        plateau[i][j] = 0; // Initialise la case avec 0

        // Crée un élément div pour représenter la case
        let Case = document.createElement('div');
        Case.addEventListener('click', () => DeplacerPion(i, j, plateau));

        Case.id = "case";

        // Crée un élément img pour la pièce
        let piece = document.createElement('img');
        piece.id = "piece";
        piece.classList.add('piece');
        Case.appendChild(piece);

        // Stocke la référence de l'image dans le tableau
        piecesImages[i][j] = piece;

        // Applique des classes pour le style de la case
        (i + j) % 2 == 0 ? Case.classList.add('caseclaire') : Case.classList.add('casefoncee');

        // Ajoute la case à la ligne
        ligne.appendChild(Case);
    }
    plateaudiv.appendChild(ligne);
}

// Fonction de placement des pièces

PiecePlacement(plateau);
actualiserPlateau(plateau);

