describe("Connect to test db", () => {
  it("Can connect to test db", () => {
    cy.task(
      "queryDb",
      "CREATE TABLE Students (StudentID int, FirstName varchar(255), StudentGroup varchar(255), City varchar(255))"
    );
  });
  it('input entries to the db', () => {
    cy.task('queryDb', 
    `INSERT INTO Students (StudentID, FirstName, StudentGroup, City) VALUES
    (1, "Ivan", "02-2022", "Bar"),
    (2, "Maria", "03-2022", "Budva"),
    (3, "Andrey", "02-2023", "Niksic")`).
    then((result) => {
      cy.log(JSON.stringify(result));
      expect(result.affectedRows).to.equal(3);
    });
  });

  it('select from db', () => {
    cy.task('queryDb', `SELECT FirstName FROM Students WHERE City ="Budva"`)
    .then((result) => {
      cy.log(JSON.stringify(result));
    
      });
  });

  it('add 2 students to the db', () => {
    cy.task('queryDb', `INSERT INTO Students (StudentID, FirstName, StudentGroup, City) VALUES
    (4, "Aljona", "02-2023", "Bar"),
    (5, "Anton", "02-2022", "Budva"),
    (6, "Roman", "03-2022", "Niksic"),
    (7, "Artjom", "03-2022", "Budva")`).
    then((result) => {
      cy.log(JSON.stringify(result));
      expect(result.affectedRows).to.equal(4);
     });
  });

  it('select all students from StudentGroup = 03-2022', () => {
    cy.task('queryDb', `SELECT StudentID, FirstName, StudentGroup, City  FROM Students WHERE StudentGroup ="03-2022"`)
    .then((result) => {
       JSON.stringify(result);
      cy.log(JSON.stringify(result));
      expect(result[2].StudentID).to.equal(7);      
      expect(result[2].FirstName).to.equal('Artjom');
      expect(result[2].City).to.equal('Budva');
    
    });
  });

  it("can delete db", () => {
    cy.task("queryDb", "DROP TABLE Students");
  });
});
