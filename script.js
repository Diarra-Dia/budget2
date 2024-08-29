document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector(".formulaire");
  document.getElementById("buttonDepense").addEventListener("click", () => {
    modal.classList.remove("hidden");
    modal.style.display = "block";
  });
  document.getElementById("closeModal").addEventListener("click", () => {
    modal.classList.add("hidden");
    modal.style.display = "none";
  });
  const validerDepense = document.getElementById("validerDepense");
  validerDepense.addEventListener("click", () => {
    const titreDepense = document.getElementById("titreDepense").value;
    const montantDepense = parseFloat(
      document.getElementById("montantDepense").value
    );

    // calculer le montant total des dépenses
    const Montantdesdepense = document.querySelector(
      ".MontantTotalDesDepensesEnregistrer"
    );

    let totalMontantdesdepense = parseFloat(Montantdesdepense.textContent) || 0;
    totalMontantdesdepense += montantDepense;
    Montantdesdepense.textContent = totalMontantdesdepense.toFixed(2);

    AjouterLigne(titreDepense, montantDepense);
    // fermer le modal après l'ajout
    modal.classList.add("hidden");
    modal.style.display = "none";
    // réinitialiser les champs du formulaire
    document.getElementById("titreDepense").value = "";
    document.getElementById("montantDepense").value = "";
  });

  function AjouterLigne(titreDepense, montantDepense) {
    const tbody = document.querySelector(".tbody1");
    const nouveauLigne = document.createElement("tr");
    nouveauLigne.innerHTML = `
      <td>${titreDepense}</td>
      <td class="Montantdesdepense">${montantDepense.toFixed(2)}</td>
      <td><button class="deletebutton" style="background-color:red; color: white; border:none; padding:10px; cursor: pointer; border-radius:5px;">supprimer</button></td>`;

    tbody.insertAdjacentElement("afterbegin", nouveauLigne);

    const deleteButton = nouveauLigne.querySelector(".deletebutton");
    deleteButton.addEventListener("click", () => {
      const rowDelete = deleteButton.closest("tr");
      rowDelete.remove();
      const deleteMontantDepense = parseFloat(
        rowDelete.querySelector(".Montantdesdepense").textContent
      );
      let montantTotalDepense = parseFloat(
        document.querySelector(".MontantTotalDesDepensesEnregistrer")
          .textContent
      );
      montantTotalDepense -= deleteMontantDepense;
      document.querySelector(
        ".MontantTotalDesDepensesEnregistrer"
      ).textContent = montantTotalDepense.toFixed(2);
      miseAjoursolde();
    });
  }

  // partie revenus
  const modal1 = document.querySelector(".formulaireRevenu");
  document
    .getElementById("boutonAjouterRevenu")
    .addEventListener("click", () => {
      modal1.classList.remove("hidden");
      modal1.style.display = "block";
    });
  document.getElementById("closeModalRevenu").addEventListener("click", () => {
    modal1.classList.add("hidden");
    modal1.style.display = "none";
  });

  const validerRevenu = document.getElementById("validerRevenu");
  validerRevenu.addEventListener("click", () => {
    const titreRevenu = document.getElementById("titreRevenu").value;
    const montantRevenu = parseFloat(
      document.getElementById("montantRevenu").value
    );

    AjouterLigneRevenu(titreRevenu, montantRevenu);

    // calculer le montant des revenus
    let calculDesMontantDesRevenu =
      parseFloat(document.getElementById("totalRevenu").textContent) || 0;
    calculDesMontantDesRevenu += montantRevenu;
    document.getElementById("totalRevenu").textContent =
      calculDesMontantDesRevenu.toFixed(2);
    miseAjoursolde();
  });

  function AjouterLigneRevenu(titre, montant) {
    const tbody = document.querySelector(".tbody3");
    const nouveauLigne2 = document.createElement("tr");
    nouveauLigne2.innerHTML = `
      <td>${titre}</td>
      <td class="deleteMontantRevenu">${montant.toFixed(2)}</td>
      <td><button class="deletebutton2" style="background-color:red; color: white; border:none; padding:10px; cursor:pointer; border-radius:5px;">supprimer</button></td>`;

    tbody.insertAdjacentElement("afterbegin", nouveauLigne2);

    const deleteButton2 = nouveauLigne2.querySelector(".deletebutton2");
    deleteButton2.addEventListener("click", () => {
      const rowDelete2 = deleteButton2.closest("tr");
      rowDelete2.remove();
      const deleteMontantRevenu = parseFloat(
        rowDelete2.querySelector(".deleteMontantRevenu").textContent
      );
      let montantTotalRevenu = parseFloat(
        document.getElementById("totalRevenu").textContent
      );
      montantTotalRevenu -= deleteMontantRevenu;
      document.getElementById("totalRevenu").textContent =
        montantTotalRevenu.toFixed(2);
      miseAjoursolde();
    });
  }

  // calcul solde
  function miseAjoursolde() {
    const montantDesDepenses =
      parseFloat(
        document.querySelector(".MontantTotalDesDepensesEnregistrer")
          .textContent
      ) || 0;
    const montantRevenu =
      parseFloat(document.getElementById("totalRevenu").textContent) || 0;
    const solde = montantRevenu - montantDesDepenses;
    document.getElementById("Solde").textContent = solde.toFixed(2);
  }
});
