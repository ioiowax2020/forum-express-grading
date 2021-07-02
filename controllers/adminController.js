const db = require('../models')
const Restaurant = db.Restaurant
const User = db.User
const Category = db.Category
const fs = require('fs')
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

const adminService = require('../services/adminService')


const adminController = {

  getRestaurants: (req, res) => {
    adminService.getRestaurants(req, res, (data) => {
      return res.render('admin/restaurants', data)
    })
  },
  createRestaurant: (req, res) => {
    Category.findAll({
      raw: true,
      nest: true
    }).then(categories => {
      return res.render('admin/create', {
        categories: categories
      })
    })
  },
  postRestaurants: (req, res) => {
    adminService.postRestaurants(req, res, (data) => {
      if (data['status'] === 'error') {
        req.flash('error_messages', data['message'])
      }
      req.flash('success', data['message'])
      res.redirect('/admin/restaurants')
    })
  },
  getRestaurant: (req, res) => {

    adminService.getRestaurant(req, res, (data) => {
      return res.render('admin/restaurant', data)
    })
  },
  editRestaurant: (req, res) => {
    Category.findAll({
      raw: true,
      nest: true
    }).then((categories) => {
      return Restaurant.findByPk(req.params.id)
        .then(restaurant => {
          return res.render('admin/create', {
            categories: categories,
            restaurant: restaurant.toJSON()
          })
        })
    })
  },
  putRestaurant: (req, res) => {
    adminService.postRestaurants(req, res, (data) => {
      if (data['status' === 'error']) {

        req.flash('error_messages', data['message'])
      }
      req.flash('success', data['message'])
      res.redirect('/admin/restaurants')
    })
    // if (!req.body.name) {
    //   req.flash('error_messages', 'name dosent exist!')
    //   return res.redirect('back')
    // }
    // const { file } = req
    // if (file) {
    //   imgur.setClientID(IMGUR_CLIENT_ID)
    //   imgur.upload(file.path, (err, img) => {
    //     return Restaurant.findByPk(req.params.id)
    //       .then((restaurant) => {
    //         restaurant.update({
    //           name: req.body.name,
    //           tel: req.body.tel,
    //           address: req.body.address,
    //           opening_hours: req.body.opening_hours,
    //           description: req.body.description,
    //           image: file ? img.data.link : restaurant.image,
    //           CategoryId: req.body.categoryId
    //         }).then((restaurant) => {
    //           req.flash('success_messages', 'restaurant was successfully to update')
    //           res.redirect('/admin/restaurants')
    //         })
    //       })
    //   })

    // } else {

    //   return Restaurant.findByPk(req.params.id)
    //     .then((restaurant) => {
    //       restaurant.update({
    //         name: req.body.name,
    //         tel: req.body.tel,
    //         address: req.body.address,
    //         opening_hours: req.body.opening_hours,
    //         description: req.body.description,
    //         CategoryId: req.body.categoryId
    //       })
    //         .then((restaurant) => {
    //           req.flash('success_messages', 'restaurant was successfully to update')
    //           res.redirect('/admin/restaurants')
    //         })
    //     })
    // }
  },
  deleteRestaurant: (req, res) => {
    adminService.deleteRestaurant(req, res, (data) => {
      if (data['status'] === 'success') {
        return res.redirect('/admin/restaurants')
      }
    })
  },
  getUsers: (req, res) => {
    return User.findAll({ raw: true }).then(users => {
      return res.render('admin/users', { users: users })
    })
  },
  toggleAdmin: (req, res) => {
    return User.findByPk(req.params.id)
      .then(user => {
        const isAdmin = !user.isAdmin
        user.update({ isAdmin })
      })
      .then(() => {
        req.flash('success_messages', 'Changed had been successfully!')
        res.redirect('/admin/users')
      })
  }
}

module.exports = adminController