import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, NgForm } from "@angular/forms";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { combineLatest, map } from 'rxjs';
import { DataRestService } from 'src/app/service/data-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class ClientComponent {
  [x: string]: any;
  clients: any[] = [];
  allClients: any[] = [];
  pves: any[] = [];
  isModalOpen: boolean = false;
  loading: boolean = true;
  saving: boolean = false;
  client: any = {};
  pv: any = {};
  sModelName = 'user';
  @ViewChild('ngModal', { static: false })
  ngModal!: ElementRef;
  mpForm!: FormGroup;
  user: any;

  first_name = '';

  last_name = '';

  email = '';

  phone = '';

  message = '';


  grades = [
    { titre: "Administrateur", value: 50 },
    { titre: "Directeur des études", value: 40 },
    { titre: "Chef de pv", value: 35 },
    { titre: "Comptable", value: 30 },
    { titre: "Surveillant Général", value: 20 },
    { titre: "Censeur", value: 10 },
    { titre: "Client", value: 0 },
  ];

  constructor(
    private dataRestService: DataRestService,
    private modalService: NgbModal
  ) {
    this.pv = this.dataRestService.getOneLocalData("pv");
  }

  ngOnInit(): void {
    this.user = this.dataRestService.getOneLocalData("user");
  }

  ngAfterViewInit(): void {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    combineLatest(
      this.dataRestService.getAll('pointvente', false, this.sModelName),
    ).pipe(map(([clients]: any[]) => {
      this.allClients = clients;
      this.changeClient();
    },
      (err: any) => {
        const message = "Une erreur s'est produite. \n" + (err.message || '');
        Swal.fire(message, '', 'error').then();
      }
    )).subscribe(() => { }, (err) => { });
  }

  changeClient() {
    this.allClients = this.allClients.filter((user: any) => parseInt(user.grade, 10) === 0 && user.pointvente.id === parseInt(this.pv.id, 10));
    this.clients = this.allClients.map((u: any) => { return { ...u, ...{ poste: this.grades.find((g: any) => g.value === parseInt(u.grade, 10))?.titre } } });
    this.loading = false;
  }


  sousmissionForm(form: NgForm) {
    if (form.valid) {
      // Préparation des données

      // const contactData: ContactForm = {
      //     first_name: this.first_name,
      //     last_name: this.last_name,
      //     email: this.email,
      //     phone: this.phone,
      //     message: this.message
      // };

      // Création d'un FormData pour multipart/form-data
      const fd = new FormData();
      fd.append('first_name', this.first_name);
      fd.append('last_name', this.last_name);
      fd.append('email', this.email);
      fd.append('phone', this.phone);
      fd.append('message', this.message);

      this.paramService.addContact(fd).subscribe({
        next: (response) => console.log('Message envoyé avec succès !', response),
        error: (err) => console.error("Erreur lors de l'envoi du message", err)
      });
    } else {
      alert('Veuillez remplir tous les champs correctement.');
    }
  }
  // mettre dans le service
  addContact(fd: FormData) {
    return this._http.post(this.apiUrlMessage, fd);
  }
}
