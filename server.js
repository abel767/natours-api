const fs = require('fs')
const express = require('express')
const app = express();

app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/tours-simple.json`));

const getAllTour = (req,res)=>{
    console.log("get method worked")
      res.status(200).
      json({
        status: 'Sucess',
        results: tours.length,
        data: {
            tours: tours
        }
      })
}


const getTour = (req,res)=>{
    console.log(req.params)
    const id = Number(req.params.id);
    const tour = tours.find(el => el.id === id);
    if(!tour){
       return res.status(404).
       json({
        status: 'fail',
        message: 'Invalid ID',
       })
    }
    res.status(200).
    json({
        status: 'Scuess',
        data: {
            tours: tour
        }
    })

}

const createTour = (req,res)=>{
    if(!req.body){
        console.log("can't find the document");
    }

    const newId = tours[tours.length - 1].id + 1;
    const newTours = Object.assign({id: newId}, req.body);
    
    tours.push(newTours);
    fs.writeFile(`${__dirname}/data/tours-simple.json`,JSON.stringify(tours), (err)=>{
        // console.log("writing is done");
        res.status(201).
        json({
            status: 'Sucess',
            data: {
                tours: newTours
            }
        })
    })
}

const updateTour = (req,res) =>{
    if(Number(req.params.id) > tours.length){
        return res.status(404).
        json({
            status: 'fail',
            message: 'Invalid ID',
        })
    }

    res.status(200).
    json({
        status: 'Sucess',
        results : tours.length,
        data: {
            tours: "<Updated tour>"
        }
    })
}

const deleteTour = (req,res)=>{
    if(Number(req.params.id) > tours.length){
         res.status(404).
         json({
            status: 'fail',
            message: "Invalid Id "
         })
    }
    res.status(204).
    json({
        status: 'Sucess',
        data: null
    })
}



// app.get('/api/v2/tours', getAllTours );

// app.get('/api/v2/tours/:id', getTour);

// app.post('/api/v2/tours', createTour)
//                                                  will work exact way 
// app.patch('api/v2/tours', updateTour)

// app.delete('api/v2/tours', deleteTour)


// making it clean using route 
app.route('/api/v2/tours').get(getAllTour).post(createTour)

app.route('/api/v2/tours/id').get(getTour).patch(updateTour).delete(deleteTour)



app.listen(1000, ()=>{
    console.log('http://localhost:1000')
})