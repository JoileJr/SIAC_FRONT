export class CepBrasilApiResponse {
    cep: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    service: string;

    constructor(
      cep: string,
      state: string,
      city: string,
      neighborhood: string,
      street: string,
      service: string
    ) {
      this.cep = cep;
      this.state = state;
      this.city = city;
      this.neighborhood = neighborhood;
      this.street = street;
      this.service = service;
    }
  }
