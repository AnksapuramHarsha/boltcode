// import React, { useEffect, useState } from 'react';
// import { PatientFormStep } from '../patient-form-step';
// import { usePatientForm } from '../patient-form-context';
// import {
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from '@/components/ui/select';
// import axios from 'axios';
// import { apiUrl } from '@/utils/api';

// export function AddressDetailsStep() {
//   const { form } = usePatientForm();

//   const selectedCountry = form.watch('address.countryId');
//   const selectedState = form.watch('address.stateId');
//   const selectedDistrict = form.watch('address.districtId');

//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [districts, setDistricts] = useState([]);

//   const [loading, setLoading] = useState({
//     initial: true,
//     countries: false,
//     states: false,
//     districts: false
//   });

//   useEffect(() => {
//     const loadInitialData = async () => {
//       try {
//         setLoading(prev => ({ ...prev, countries: true }));
//         const countriesRes = await axios.get(apiUrl('/geo/countries'));
//         setCountries(countriesRes.data);

//         const address = form.getValues('address');
//         if (address?.countryId) {
//           setLoading(prev => ({ ...prev, states: true }));
//           const statesRes = await axios.get(apiUrl(`/geo/countries/${address.countryId}/states`));
//           setStates(statesRes.data);

//           if (address?.stateId) {
//             setLoading(prev => ({ ...prev, districts: true }));
//             const districtsRes = await axios.get(apiUrl(`/geo/states/${address.stateId}/districts`));
//             setDistricts(districtsRes.data);
//           }
//         }
//       } catch (err) {
//         console.error('Failed to load geography data:', err);
//       } finally {
//         setLoading({ initial: false, countries: false, states: false, districts: false });
//       }
//     };

//     loadInitialData();
//   }, []);

//   useEffect(() => {
//     const loadStates = async () => {
//       if (!selectedCountry) {
//         setStates([]);
//         form.setValue('address.stateId', null);
//         form.setValue('address.districtId', null);
//         return;
//       }

//       try {
//         setLoading(prev => ({ ...prev, states: true }));
//         const response = await axios.get(apiUrl(`/geo/countries/${selectedCountry}/states`));
//         setStates(response.data);
//       } catch (err) {
//         console.error('Failed to load states:', err);
//       } finally {
//         setLoading(prev => ({ ...prev, states: false }));
//       }
//     };

//     loadStates();
//   }, [selectedCountry, form]);

//   useEffect(() => {
//     const loadDistricts = async () => {
//       if (!selectedState) {
//         setDistricts([]);
//         form.setValue('address.districtId', null);
//         return;
//       }

//       try {
//         setLoading(prev => ({ ...prev, districts: true }));
//         const response = await axios.get(apiUrl(`/geo/states/${selectedState}/districts`));
//         setDistricts(response.data);
//       } catch (err) {
//         console.error('Failed to load districts:', err);
//       } finally {
//         setLoading(prev => ({ ...prev, districts: false }));
//       }
//     };

//     loadDistricts();
//   }, [selectedState, form]);

//   if (loading.initial) {
//     return <div className="p-6 text-center text-muted-foreground text-sm">Loading address details...</div>;
//   }

//   return (
//     <PatientFormStep title="4. Address Details" description="Residential address of the patient">
//       <div className="space-y-6">
//         <div className="grid grid-cols-2 gap-4">
//           {/* Country */}
//           <FormField
//             control={form.control}
//             name="address.countryId"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Country</FormLabel>
//                 <Select onValueChange={field.onChange} value={field.value || undefined}>
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select country" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     {countries.map((country) => (
//                       <SelectItem key={country.id} value={country.id}>
//                         {country.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* State */}
//           <FormField
//             control={form.control}
//             name="address.stateId"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>State</FormLabel>
//                 <Select onValueChange={field.onChange} value={field.value || undefined} disabled={!selectedCountry || loading.states}>
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select state" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     {states.map((state) => (
//                       <SelectItem key={state.id} value={state.id}>
//                         {state.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* District */}
//           <FormField
//             control={form.control}
//             name="address.districtId"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>District</FormLabel>
//                 <Select onValueChange={field.onChange} value={field.value || undefined} disabled={!selectedState || loading.districts}>
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select district" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     {districts.map((district) => (
//                       <SelectItem key={district.id} value={district.id}>
//                         {district.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* City/Village */}
//           <FormField
//             control={form.control}
//             name="address.cityOrVillage"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>City / Village</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter city or village" {...field} onChange={(e) => field.onChange(e.target.value || null)} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Address Type */}
//           <FormField
//             control={form.control}
//             name="address.addressType"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Address Type</FormLabel>
//                 <Select onValueChange={field.onChange} value={field.value || 'Permanent'}>
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select address type" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     <SelectItem value="Present">Present</SelectItem>
//                     <SelectItem value="Permanent">Permanent</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* House No */}
//           <FormField
//             control={form.control}
//             name="address.houseNoOrFlatNo"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>House / Flat Number</FormLabel>
//                 <FormControl>
//                   <Input placeholder="E.g. 123/A, Block 4" {...field} onChange={(e) => field.onChange(e.target.value || null)} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Locality */}
//           <FormField
//             control={form.control}
//             name="address.localityOrSector"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Locality / Sector</FormLabel>
//                 <FormControl>
//                   <Input placeholder="E.g. Lakshmi Nagar, Sector 21" {...field} onChange={(e) => field.onChange(e.target.value || null)} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Pincode */}
//           <FormField
//             control={form.control}
//             name="address.pincode"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>PIN Code</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="6-digit PIN"
//                     maxLength={6}
//                     {...field}
//                     onChange={(e) => field.onChange(e.target.value || null)}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
//       </div>
//     </PatientFormStep>
//   );
// }
import React, { useEffect, useState } from 'react';
import { PatientFormStep } from '../patient-form-step';
import { usePatientForm } from '../patient-form-context';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import axios from 'axios';
import { apiUrl } from '@/utils/api';

export function AddressDetailsStep() {
  const { form } = usePatientForm();

  // ✅ Updated to match addresses[0]
  const selectedCountry = form.watch('addresses.0.countryId');
  const selectedState = form.watch('addresses.0.stateId');
  const selectedDistrict = form.watch('addresses.0.districtId');

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [loading, setLoading] = useState({
    initial: true,
    countries: false,
    states: false,
    districts: false,
  });

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(prev => ({ ...prev, countries: true }));
        const countriesRes = await axios.get(apiUrl('/geo/countries'));
        setCountries(countriesRes.data);

        const address = form.getValues('addresses.0');
        if (address?.countryId) {
          setLoading(prev => ({ ...prev, states: true }));
          const statesRes = await axios.get(apiUrl(`/geo/countries/${address.countryId}/states`));
          setStates(statesRes.data);

          if (address?.stateId) {
            setLoading(prev => ({ ...prev, districts: true }));
            const districtsRes = await axios.get(apiUrl(`/geo/states/${address.stateId}/districts`));
            setDistricts(districtsRes.data);
          }
        }
      } catch (err) {
        console.error('Failed to load geography data:', err);
      } finally {
        setLoading({ initial: false, countries: false, states: false, districts: false });
      }
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    const loadStates = async () => {
      if (!selectedCountry) {
        setStates([]);
        form.setValue('addresses.0.stateId', '');
        form.setValue('addresses.0.districtId', '');
        return;
      }

      try {
        setLoading(prev => ({ ...prev, states: true }));
        const response = await axios.get(apiUrl(`/geo/countries/${selectedCountry}/states`));
        setStates(response.data);
      } catch (err) {
        console.error('Failed to load states:', err);
      } finally {
        setLoading(prev => ({ ...prev, states: false }));
      }
    };

    loadStates();
  }, [selectedCountry, form]);

  useEffect(() => {
    const loadDistricts = async () => {
      if (!selectedState) {
        setDistricts([]);
        form.setValue('addresses.0.districtId', '');
        return;
      }

      try {
        setLoading(prev => ({ ...prev, districts: true }));
        const response = await axios.get(apiUrl(`/geo/states/${selectedState}/districts`));
        setDistricts(response.data);
      } catch (err) {
        console.error('Failed to load districts:', err);
      } finally {
        setLoading(prev => ({ ...prev, districts: false }));
      }
    };

    loadDistricts();
  }, [selectedState, form]);

  if (loading.initial) {
    return <div className="p-6 text-center text-muted-foreground text-sm">Loading address details...</div>;
  }

  return (
    <PatientFormStep title="4. Address Details" description="Residential address of the patient">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">

          {/* Country */}
          <FormField
            control={form.control}
            name="addresses.0.countryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <Select onValueChange={(val) => field.onChange(val || '')} value={field.value || ''}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.id} value={country.id}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* State */}
          <FormField
            control={form.control}
            name="addresses.0.stateId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <Select
                  onValueChange={(val) => field.onChange(val || '')}
                  value={field.value || ''}
                  disabled={!selectedCountry || loading.states}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state.id} value={state.id}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* District */}
          <FormField
            control={form.control}
            name="addresses.0.districtId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>District</FormLabel>
                <Select
                  onValueChange={(val) => field.onChange(val || '')}
                  value={field.value || ''}
                  disabled={!selectedState || loading.districts}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {districts.map((district) => (
                      <SelectItem key={district.id} value={district.id}>
                        {district.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* City/Village */}
          <FormField
            control={form.control}
            name="addresses.0.cityOrVillage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City / Village</FormLabel>
                <FormControl>
                  <Input placeholder="Enter city or village" {...field} onChange={(e) => field.onChange(e.target.value || '')} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address Type */}
          <FormField
            control={form.control}
            name="addresses.0.addressType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value || 'Permanent'}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select address type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Present">Present</SelectItem>
                    <SelectItem value="Permanent">Permanent</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* House No */}
          <FormField
            control={form.control}
            name="addresses.0.houseNoOrFlatNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>House / Flat Number</FormLabel>
                <FormControl>
                  <Input placeholder="E.g. 123/A, Block 4" {...field} onChange={(e) => field.onChange(e.target.value || '')} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Locality */}
          <FormField
            control={form.control}
            name="addresses.0.localityOrSector"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Locality / Sector</FormLabel>
                <FormControl>
                  <Input placeholder="E.g. Lakshmi Nagar, Sector 21" {...field} onChange={(e) => field.onChange(e.target.value || '')} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Pincode */}
          <FormField
            control={form.control}
            name="addresses.0.pincode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PIN Code</FormLabel>
                <FormControl>
                  <Input
                    placeholder="6-digit PIN"
                    maxLength={6}
                    {...field}
                    onChange={(e) => field.onChange(e.target.value || '')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </PatientFormStep>
  );
}
