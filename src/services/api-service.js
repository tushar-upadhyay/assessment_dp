import { PEOPLE_URL } from "../constants";

export class APIService {

    constructor(){
        this.peopleUrl = PEOPLE_URL;
    }

    request = async(url,method = 'GET') => {
        let response;
        try {
            response = await fetch(url,{method});
            if(response.status !== 200){
                throw new Error('Some Error Occured');
            }
            response = await response.json();
            return ({response,error:false});
        }
        catch(err){
            return ({
                error:err,
                response
            });
        }
    }

    peoples = async(page = 1,searchKeyword) => {
            console.log('i ran 2')
            return await this.request(`${this.peopleUrl}?page=${page}&search=${searchKeyword}`);
    }

    peopleDetails = async(id) => {
        return await this.request(`${this.peopleUrl}id`);
    }


}

export const apiService = new APIService();