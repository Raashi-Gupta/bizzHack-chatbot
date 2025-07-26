import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {
  userId: string='';  
  

  constructor(private readonly http: HttpClient) {

  }
    // private uploadFile = 'http://127.0.0.1:5000/upload';
    // private uploadUrl = 'http://127.0.0.1:5000/linkUpload';

     private uploadFile = 'https://bizzhack-rag.onrender.com/upload';
    private uploadUrl = 'https://bizzhack-rag.onrender.com/linkUpload';

 uploadFiles(namespace: string, files: File[]): Observable<any> {
  const formData = new FormData();
  formData.append('namespace', namespace);
formData.append('index_name', 'new-rag-documents'); 

  for (const file of files) {
    formData.append('files', file);
  }

  return this.http.post<any>(this.uploadFile, formData);  
}

uploadLinks(namespace: string, urls: string[]): Observable<any> {
  debugger 
  const payload = {
    namespace,
    index_name: 'new-rag-documents',
    urls: urls
  };

  return this.http.post<any>(this.uploadUrl, payload);
}


}