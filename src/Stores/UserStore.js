import { observable, computed, action } from 'mobx'
import axios from 'axios'
import { async } from 'q';


class UserStore {
   @observable user = {}
   @observable name
  
   @observable userConcerts=[]
   @observable favorites=[]


   constructor() {
   
      this.user = {
         id: localStorage.id || "",
         name:  localStorage.name || "",
         email:  localStorage.email || "",
         phone_number:  localStorage.phone_number || "",
      }
    
      
   }

   @action handleInput = (name, value) => {
      this.user[name] = value
   }

   @action logout = () => {
      localStorage.clear()
      this.user = {
         id: localStorage.id || "",
         name:  localStorage.name || "",
         email:  localStorage.email || "",
         phone_number:  localStorage.phone_number || "",
      }
   }
   @action getUser = async () => {
      if(this.user.password == undefined ){
        return alert("Enter correct email and password")
      } else {
      let hashPass = await this.hashCode(this.user.password)
 
      const response = await axios.get(`http://localhost:5000/user/${this.user.email}/${hashPass}`)

      if (response.data){
         this.user = { ...response.data }
         localStorage.id = response.data.id 
         localStorage.name = response.data.name 
         localStorage.email = response.data.email 
         localStorage.phone_number = response.data.phone_number       
      } else {
         alert("Enter correct password")
      }

   }
   }

   @action getUserConcerts = async () => {
      const response = await axios.get(`http://localhost:5000/user-concerts/${this.user.id}`)
      this.userConcerts = [...response.data]
   }

   @action deleteConcert = async (concertId) => {
      const response = await axios.put(`http://localhost:5000/delete-concert/${concertId}`);
      this.getUserConcerts()
   }
   @action markAsSold = async (concertId) => {
      const response = await axios.put(`http://localhost:5000/sold/${concertId}`);
      this.getUserConcerts()
   }
   @action addToFavorites = async (concertId) => {
      await axios.post(`http://localhost:5000/favorite/${this.user.id}/${concertId}`)
   }

   @action getFavorites = async () => {
      const response = await axios.get(`http://localhost:5000/favorites/${this.user.id}`)
      this.favorites = [...response.data]
   }

    hashCode = function(str) {
      var hash = 0, i, chr;
      if (str.length === 0) return hash;
      for (i = 0; i < str.length; i++) {
        chr   = str.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
      }
      return hash.toString();
    };

    @action deleteFromFavorite = async (concertId) => {
      await axios.delete(`http://localhost:5000/favorite/${this.user.id}/${concertId}`)
    }

}

export default new UserStore()