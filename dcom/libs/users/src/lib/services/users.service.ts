import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '@env/environment';
import { User } from '../models/user';
import * as countriesLib from 'i18n-iso-countries';
declare const require: any;
@Injectable({
    providedIn: 'root'
})
export class UsersService {
    apiURLUsers = environment.apiURL + 'users';
    constructor(private http: HttpClient) {
        countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
    }

    //get all
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiURLUsers);
    }
    //get one
    getUser(userId: string): Observable<User> {
        return this.http.get<User>(`${this.apiURLUsers}/${userId}`);
    }
    //create
    createUser(user: User): Observable<User> {
        return this.http.post<User>(this.apiURLUsers, user);
    }
    //update
    updateUser(user: User): Observable<User> {
        return this.http.put<User>(`${this.apiURLUsers}/${user.id}`, user);
    }
    //delete
    deleteUser(userId: string): Observable<any> {
        return this.http.delete<any>(`${this.apiURLUsers}/${userId}`);
    }

    getUsersCount(): Observable<number> {
        return this.http
            .get<number>(`${this.apiURLUsers}/get/count`)
            .pipe(map((objectValue: any) => objectValue.userCount));
    }

    getCountries(): { id: string; name: string }[] {
        return Object.entries(countriesLib.getNames('en', { select: 'official' })).map((entry) => {
            return {
                id: entry[0],
                name: entry[1]
            };
        });
    }

    getCountry(countryKey: string): string {
        return countriesLib.getName(countryKey, 'en');
    }
}
