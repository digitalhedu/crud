const {index,one,create,write} = require('../models/products.model');
module.exports ={
  index: (req,res) =>{

    let products = index();

    if(req.query && req.query.name){
      products = products.filter(product => product.name.toLowerCase().indexOf(req.query.name.toLowerCase()) > -1)
    }
    return res.render('products/list',{
      title: 'List of products',
      products: products
    })
  },
  detail: (req, res) => {
    let product = one(parseInt(req.params.id))

    if(!product){
      return res.redirect('/products/')
    }
    return res.render('products/detail', {
      title: 'Detail of products',
      product:product 
    })
  },
  create: (req,res) => {
    return res.render('products/create', {
      title: 'Create Product',
    })
  },
  save: (req, res) => {
    req.body.image = req.files[0].filename
    let newProduct = create(req.body)
    let products = index();
    products.push(newProduct)
    write(products)
    return res.redirect('/products/')
  },
}