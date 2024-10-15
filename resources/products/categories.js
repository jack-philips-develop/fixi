const enumerations = require('../../config/enumerations');

const productCategories = [
    {
        id: enumerations.mainCategoryType.dog,
        label: 'سگ',
        children: [
            {
                id: enumerations.subCategories.dogDryFood,
                label: 'غذای خشک',
                children: null
            },
            {
                id: enumerations.subCategories.dogWetAndCannedFood,
                label: 'غذای مرطوب، کنسرو و پوچ',
                children: null
            },
            {
                id: enumerations.subCategories.dogEncouragement,
                label: 'تشویقی',
                children: null
            },
            {
                id: enumerations.subCategories.dogSupplementsAndMultivitamins,
                label: 'مکمل و مولتی ویتامین',
                children: null
            },
        ]
    },
    {
        id: enumerations.mainCategoryType.cat,
        label: 'سگ',
        children: [
            {
                id: enumerations.subCategories.catDryFood,
                label: 'غذای خشک',
                children: null
            },
            {
                id: enumerations.subCategories.catWetAndCannedFood,
                label: 'غذای مرطوب، کنسرو و پوچ',
                children: null
            },
            {
                id: enumerations.subCategories.catEncouragement,
                label: 'تشویقی',
                children: null
            },
            {
                id: enumerations.subCategories.catSupplementsAndMultivitamins,
                label: 'مکمل و مولتی ویتامین',
                children: null
            },
        ]
    },
    {
        id: enumerations.mainCategoryType.accessories,
        label: 'سگ',
        children: null
    },
    {
        id: enumerations.mainCategoryType.healthAndCare,
        label: 'سگ',
        children: null
    },
    {
        id: enumerations.mainCategoryType.nest,
        label: 'سگ',
        children: null
    },
];