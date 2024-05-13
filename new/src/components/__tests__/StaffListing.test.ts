/**
 * @vitest-enviroment happy-dom
 */

import {describe, it, expect} from 'vitest'
import {mount} from '@vue/test-utils'
import Foo from '@/components/tables/Admin Tables/StaffListing.vue'

describe('Foo', () => {
    

    it('sorts by ID when clicked', async () => {
        // Mount the component
        const wrapper = mount(Foo);
        console.log("ID STARTS");
        await wrapper.find('th[data-column="id"]').trigger('click');
        const rows = wrapper.findAll('tr[data-row]');
        console.log(rows);
        let prevId = -Infinity;
        rows.forEach(row => {
          const id = parseInt(row.find('td[data-column="id"]').text());
          expect(id).toBeGreaterThanOrEqual(prevId);
          prevId = id;
        });
        

      });
      it('sorts by Name when clicked', async () => {
        const wrapper = mount(Foo);
        await wrapper.find('th[data-column="name"]').trigger('click');
        const rows = wrapper.findAll('tr[data-row]');
        let prevName = '';
        rows.forEach(row => {
          const name = row.find('td[data-column="name"]').text();
          expect(name).toBeGreaterThanOrEqual(prevName);
          prevName = name;
        });
      });
    
      it('sorts by Department when clicked', async () => {
        const wrapper = mount(Foo);
        await wrapper.find('th[data-column="department"]').trigger('click');
        const rows = wrapper.findAll('tr[data-row]');
        let prevDepartment = '';
        rows.forEach(row => {
          const department = row.find('td[data-column="department"]').text();
          expect(department).toBeGreaterThanOrEqual(prevDepartment);
          prevDepartment = department;
        });
      });
    
      it('sorts by Email when clicked', async () => {
        const wrapper = mount(Foo);
        await wrapper.find('th[data-column="email"]').trigger('click');
        const rows = wrapper.findAll('tr[data-row]');
        let prevEmail = '';
        rows.forEach(row => {
          const email = row.find('td[data-column="email"]').text();
          expect(email).toBeGreaterThanOrEqual(prevEmail);
          prevEmail = email;
        });
      });
    
      it('sorts by Role when clicked', async () => {
        const wrapper = mount(Foo);
        await wrapper.find('th[data-column="role"]').trigger('click');
        const rows = wrapper.findAll('tr[data-row]');
        let prevRole = '';
        rows.forEach(row => {
          const role = row.find('td[data-column="role"]').text();
          expect(role).toBeGreaterThanOrEqual(prevRole);
          prevRole = role;
        });
      });
  });

  describe('Render', () => {
    it('renders the table with the correct structure', () => {
        // Mount the component
        const wrapper = mount(Foo);
    
        // Assert that the component contains a table element
        expect(wrapper.find('table').exists()).toBe(true);
    
        // Assert that the table contains the expected number of table headers
        const expectedHeaders = ['ID', 'Isim', 'Bölüm', 'E-Mail', 'Rol', ''];
        const headers = wrapper.findAll('th');
        expect(headers.length).toBe(expectedHeaders.length);
        headers.forEach((header, index) => {
          expect(header.text()).toBe(expectedHeaders[index]);
        });
    
        // You can add more assertions to ensure the presence and correctness of other elements in the table
      });

      it('renders the add popup when button clicked', async () => {
        
            const wrapper = mount(Foo);
        
            // Initially, the popup should not be visible
            expect(wrapper.find('.bg-gray-500').exists()).toBe(false);
            
            // Find the "Birim Ekle" button and trigger a click event
            await wrapper.find('button.p-\\[1\\%\\].bg-blue-500').trigger('click')


            // Now, the popup should be visible
            expect(wrapper.find('.bg-gray-500').exists()).toBe(true);
          
        
      });

      it('renders the edit popup when button clicked', async () => {
        
        const wrapper = mount(Foo);
    
        // Initially, the popup should not be visible
        expect(wrapper.find('.bg-gray-500').exists()).toBe(false);
        
        
      
    
  });


});