const FonoModel = require('../models/FonoModel');

exports.list = async () => {

    try{
        let fono = await FonoModel.find({});

        return fono;
    }catch(err){
        return undefined;
    }

}

exports.find = async data => {

    try{

        let listFono = await FonoModel.find({username: data.username})

        if (listFono.length > 0){
            return undefined;
        }else{
            return undefined;
        }

    }catch(err){
        return undefined;
    }

}

exports.create = async data => {

    try{

        let listFono = await FonoModel.find({username: data.username})

        if (listFono.length > 0){
            return undefined;
        }else{

            let fono = await FonoModel.create(data);

            return fono;
        }

    }catch(err){
        return undefined;
    }

}