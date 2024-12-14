window.addEventListener("load", function () {
  const containerHTML = `
    <div id="calculator">
      <button id="calculate">Regn ut snitt</button>
      <p id="result"></p>
      <p id="calculation"></p>
    </div>
  `;

  const container = document.createElement("div");
  container.innerHTML = containerHTML;
  document.body.append(container);

  document.getElementById("calculate").addEventListener("click", calculateGPA);
});

const gradePoint = {
  A: 50,
  B: 40,
  C: 30,
  D: 20,
  E: 10,
};

function getLetterGrade(gpa) {
  if (gpa >= gradePoint.A) return "A";
  if (gpa >= gradePoint.B) return "B";
  if (gpa >= gradePoint.C) return "C";
  if (gpa >= gradePoint.D) return "D";
  if (gpa >= gradePoint.E) return "E";
  return "F";
}

function calculateGPA() {
  const rows = document.querySelectorAll(".table-standard tbody tr");
  let totalPoints = 0;
  let totalCredits = 0;

  rows.forEach((row) => {
    const gradeDiv = row.querySelector(".col6Resultat .infoLinje span");
    const creditCell = row.querySelector(".col7Studiepoeng span");

    if (gradeDiv && creditCell) {
      const grade = gradeDiv.textContent.trim();
      const credits = parseFloat(creditCell.textContent.trim());

      if (!isNaN(credits) && credits > 0 && grade in gradePoint) {
        totalPoints += gradePoint[grade] * credits;
        totalCredits += credits;
      }
    }
  });

  const gpaScore =
    totalCredits > 0 ? Math.round(totalPoints / totalCredits) : 0;
  const gpaLetter = getLetterGrade(gpaScore);

  const resultElement = document.getElementById("result");

  resultElement.textContent = `${gpaLetter}`;
}
