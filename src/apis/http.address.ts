import { IProvice } from "../models/address.model";
import request, { AxiosResponse } from "axios";
import axios from "axios";
export default class AddressAPI {
    static async getProvinces(){
        try {
            var response = await axios.get<Array<IProvice>>('https://provinces.open-api.vn/api/p/');
            if(response && response.data){
                return response.data;
            }
        } catch (error) {
            if (error && request.isAxiosError(error)) {
                return error.response;
            }
        }
    }

    static async getDistrictsByProvinceCode(provinceCode : number){
        try {
            console.log("http - provinceCode     : " + provinceCode)
            var response = await axios.get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
            if(response && response.data) return response.data.districts;
        } catch (error) {
            if(error && request.isAxiosError(error)){
                return error.response;
            }
        }
    }

    static async getWardsByDistrictCode(districtCode : number){
        try {
            console.log("http - districtCode     : " + districtCode)
            var response = await axios.get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
            if(response && response.data) return response.data.wards;
        } catch (error) {
            if(error && request.isAxiosError(error)){
                return error.response;
            }
        }
    }

    static async getProviceNameByCode(pCode : number){
        try {
            var response = await axios.get(`https://provinces.open-api.vn/api/p/${pCode}`);
            if(response && response.data) return response.data.name;
        } catch (error) {
            if(error && request.isAxiosError(error)){
                return error.response;
            }
        }
    }

    static async getDistrictNameByCode(dCode : number){
        try {
            var response = await axios.get(`https://provinces.open-api.vn/api/d/${dCode}`);
            if(response && response.data) return response.data.name;
        } catch (error) {
            if(error && request.isAxiosError(error)){
                return error.response;
            }
        }
    }

    static async getWardNameByCode(wCode : number){
        try {
            var response = await axios.get(`https://provinces.open-api.vn/api/w/${wCode}`);
            if(response && response.data) return response.data.name;
        } catch (error) {
            if(error && request.isAxiosError(error)){
                return error.response;
            }
        }
    }
}