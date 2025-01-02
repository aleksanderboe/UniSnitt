const gradePoints = {
  A: 50,
  B: 40,
  C: 30,
  D: 20,
  E: 10,
  F: 0,
};

function getLetterGrade(points) {
  if (points >= gradePoints.A) return "A";
  if (points >= gradePoints.B) return "B";
  if (points >= gradePoints.C) return "C";
  if (points >= gradePoints.D) return "D";
  if (points >= gradePoints.E) return "E";
  return "F";
}

function calculateGPA() {
  try {
    const rows = document.querySelectorAll("table.table-standard > tbody > tr");
    let totalPoints = 0;
    let totalCredits = 0;

    rows.forEach((row) => {
      try {
        const gradeElement = row.querySelector(".col6Resultat .infoLinje span");
        const creditsElement = row.querySelector(".col7Studiepoeng span");
        const gradeSelect = row.querySelector(".grade-edit-select");

        if (
          gradeElement &&
          creditsElement &&
          creditsElement.textContent.trim()
        ) {
          const originalGrade = gradeElement.textContent.trim().toUpperCase();
          const grade = gradeSelect ? gradeSelect.value : originalGrade;
          const credits = parseFloat(
            creditsElement.textContent.trim().replace(",", ".")
          );

          if (
            !isNaN(credits) &&
            credits > 0 &&
            grade in gradePoints &&
            originalGrade in gradePoints
          ) {
            totalPoints += gradePoints[grade] * credits;
            totalCredits += credits;
          }
        }
      } catch (rowError) {
        console.log("Error processing row:", rowError);
      }
    });

    const gpaValue = totalCredits > 0 ? totalPoints / totalCredits : 0;
    const roundedGPA = Math.round(gpaValue / 10) * 10;
    const letterGrade = getLetterGrade(roundedGPA);

    document.getElementById("gpa-result").textContent = letterGrade;
    document.getElementById(
      "gpa-calculation"
    ).textContent = `${totalPoints} / ${totalCredits} = ${gpaValue.toFixed(
      2
    )} ≈ ${roundedGPA}`;
  } catch (error) {
    console.error(error);
  }
}

function makeGradesEditable() {
  const rows = document.querySelectorAll("table.table-standard > tbody > tr");
  const validGrades = ["A", "B", "C", "D", "E"];

  rows.forEach((row) => {
    const gradeElement = row.querySelector(".col6Resultat .infoLinje span");
    const creditsElement = row.querySelector(".col7Studiepoeng span");

    if (gradeElement && creditsElement && creditsElement.textContent.trim()) {
      const originalGrade = gradeElement.textContent.trim().toUpperCase();

      if (originalGrade in gradePoints) {
        const select = document.createElement("select");
        select.className = "grade-edit-select";
        select.style.marginLeft = "10px";
        select.style.padding = "2px";

        validGrades.forEach((grade) => {
          const option = document.createElement("option");
          option.value = grade;
          option.text = grade;
          option.selected = grade === originalGrade;
          select.appendChild(option);
        });

        gradeElement.parentNode.appendChild(select);
      }
    }
  });
}

function initializeCalculator() {
  const container = document.createElement("div");
  container.id = "gpa-calculator-extension";

  container.innerHTML = `
      <div class="header">
        <h2 class="title">Karaktersnitt</h2>
      </div>
      <div class="content">
        <table class="grade-table">
          <thead>
            <tr>
              <th>Karakter</th>
              <th>Poeng</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>A</td><td>50</td></tr>
            <tr><td>B</td><td>40</td></tr>
            <tr><td>C</td><td>30</td></tr>
            <tr><td>D</td><td>20</td></tr>
            <tr><td>E</td><td>10</td></tr>
            <tr><td>F</td><td>0</td></tr>
          </tbody>
        </table>
        <button id="calculate-gpa-btn">Regn ut snitt</button>
        <div class="result">
          <p id="gpa-result">-</p>
          <p id="gpa-calculation">Klikk for å beregne snitt</p>
        </div>
      </div>
    `;

  document.body.appendChild(container);

  makeGradesEditable();

  document
    .getElementById("calculate-gpa-btn")
    .addEventListener("click", calculateGPA);

  document.querySelectorAll(".grade-edit-select").forEach((input) => {
    input.addEventListener("input", calculateGPA);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeCalculator);
} else {
  initializeCalculator();
}
