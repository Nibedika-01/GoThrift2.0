const express = require('express');
const router = express.Router();
const Clothing = require('../models/Clothing');

router.get('/search', async (req, res) => {
    try {
        const {
            q,
            category,
            minPrice,
            maxPrice,
            color,
            size,
            sort = 'newest'
        } = req.query;

        //build search query
        let searchQuery = {};

        //text search across name and color
        if (q) {
            searchQuery.$or = [
                { name: { $regex: q, $options: 'i' } }, //$regex: q means: match the keyword anywhere in the string.
                { color: { $regex: q, $options: 'i' } }
            ];
        }

        // Category filter
        if (category && category !== 'all') {
            searchQuery.category = category;
        }

        //price filter
        if (minPrice || maxPrice) {
            searchQuery.price = {};
            if (minPrice) searchQuery.price.$gte = parseFloat(minPrice);
            if (maxPrice) searchQuery.price.$lte = parseFloat(maxPrice);
        }

        //color filter
        if (color) {
            searchQuery.color = { $regex: color, $options: 'i' };
        }

        //size filter
        if (size) {
            searchQuery.size = { $in: [size] };
        }

        //build sort options
        let sortOptions = {};
        switch (sort) {
            case 'newest':
                sortOptions = { createdAt: -1 };
                break;
            case 'oldest':
                sortOptions = { createdAt: 1 };
                break;
            case 'price-low':
                sortOptions = { price: 1 };
                break;
            case 'price-high':
                sortOptions = { price: -1 };
                break;
            case 'name':
                sortOptions = { name: -1 };
                break;
            default:
                sortOptions = { createdAt: -1 };

        }

        // Execute search - limit results to 20 for performance
        const results = await Clothing.find(searchQuery)
            .sort(sortOptions)
            .limit(20);

        //map results to include full image urls
        const mappedResults = results.map(item => ( {
            id: item._id,
            name: item.name,
            category: item.category,
            color: item.color,
            price: item.price,
            sizes: item.sizes,
            image: item.image, //keeps the original path format
            createdAt: item.createdAt
        }));

        res.json({
            success: true,
            count: mappedResults.length,
            products: mappedResults
        });


    } catch (error) {
        console.error('Search error', error);
        res.status(500).json({
            success: false,
            message: 'Search failed',
            errpr: error.message
        });
    }
});

module.exports = router;