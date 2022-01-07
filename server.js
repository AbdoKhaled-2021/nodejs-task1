const yargs = require('yargs')
const fs = require('fs')



const student = {
    id: 2, //unique
    name: 'mohamed',
    grades: [10, 7, 8]
}


function readStudents() {
    try {
        const students = JSON.parse(fs.readFileSync('students.json'))
        return students
    } catch (error) {
        return []
    }
}

function writeStudents(allStudents) {
    fs.writeFile("students.json", JSON.stringify(allStudents), function(err) {
        if (err) throw err;
        console.log('complete');
    });
}


function addStudent(student) {

    const allStudents = readStudents()


    let alreadyExist = false;

    allStudents.forEach((storedStudent) => {
        if (student.id === storedStudent.id) {
            console.log('student already exist');
            alreadyExist = true
            return
        }
    })

    if (!alreadyExist) {
        student.total = student.grades[0] + student.grades[1] + student.grades[2]
        allStudents.push(student)
        writeStudents(allStudents)
    }

}


function deleteStudent(id) {
    const allStudents = readStudents()
    const filteredStudent = allStudents.filter(student => student.id !== id)
    writeStudents(filteredStudent)
}


// addStudent(student)
// deleteStudent(student.id)

const allStudents = readStudents()
console.log('List of all Students:', allStudents);



// To be pushed
const studentafterProcessing = {
    id: 1, //unique
    name: 'Abdo',
    grades: [10, 7, 8],
    total: 10 + 7 + 8
}


// list (all students)
// read  (by id)

// delete (using id)
yargs.command({
    command: 'delete',
    describe: 'Delete note',
    builder: {
        title: {
            describe: 'This is title description in delete command',
            demandOption: true,
            type: 'string'
        }
    },
    handler: deleteStudent
})

// listAll
yargs.command({
    command: "list",
    describe: 'List students',
    handler: readStudents
})


// read
yargs.command({
    command: 'read',
    describe: 'Read students',
    builder: {
        title: {
            describe: 'This is title in read command',
            demandOption: true,
            type: 'string'
        }
    },
    handler: readStudents
})

// push
yargs.command({
    command: 'add',
    describe: 'Add students',

    builder: {
        title: {
            describe: 'This is title description in add command',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'This is body description in add command',
            demandOption: true,
            type: Object

        }
    },
    handler: addStudent
})

yargs.parse()