const db = require('../models')
const Restaurant = db.Restaurant
const User = db.User
const Category = db.Category
const fs = require('fs')
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID


const adminService = {

  getRestaurants: (req, res, callback) => {
    return Restaurant.findAll({
      raw: true,
      nest: true,
      include: [Category]
    })
      .then(restaurants => {
        callback({ restaurants: restaurants })
      })
  },
  getRestaurant: (req, res, callback) => {

    return Restaurant.findByPk(req.params.id,
      { include: [Category] })
      .then(restaurant => {
        callback({ restaurant: restaurant.toJSON() })
      })
  },
  deleteRestaurant: (req, res, callback) => {
    return Restaurant.findByPk(req.params.id)
      .then((restaurant) => {
        restaurant.destroy()
          .then((restaurant) => {
            callback({ status: 'success', message: '' })
          })
      })
  },
  postRestaurants: (req, res, callback) => {

    if (!req.body.name) {
      return callback({
        status: 'error', message: "name didn't exist!"
      })
      // req.flash('error_messages', `Please fill in the Restaurant's name!`)
      // return res.redirect('back')
    }

    const { file } = req
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID)
      imgur.upload(file.path, (err, img) => {
        return Restaurant.create({
          name: req.body.name,
          tel: req.body.tel,
          address: req.body.address,
          opening_hours: req.body.opening_hours,
          description: req.body.description,
          image: file ? img.data.link : null,
          CategoryId: req.body.categoryId,

        }).then((restaurant) => {
          callback({ status: 'success', message: "restaurant was successfully created" })
          // req.flash('success_messages', 'restaurant was successfully created')
          // return res.redirect('/admin/restaurants')
        })
      })

    } else {
      return Restaurant.create({
        name: req.body.name,
        tel: req.body.tel,
        address: req.body.address,
        opening_hours: req.body.opening_hours,
        description: req.body.description,
        image: null,
        CategoryId: req.body.categoryId
      })
        .then((restaurants) => {
          callback({ status: 'success', message: "restaurant was successfully created" })
          // req.flash('success_messages', `${req.body.name} has successfully created!`)
          // res.redirect('/admin/restaurants')
        })
    }
  },


}
module.exports = adminService