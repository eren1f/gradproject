// 
// @vitest-environment jsdom
// 
import { mount } from '@vue/test-utils';
import { describe , it, expect} from 'vitest';
import MakeRequest from '@/components/request/MakeRequest.vue';

describe('MakeRequest', () => {
    it('renders the component', () => {
        const wrapper = mount(MakeRequest);
        expect(wrapper.exists()).toBe(true);
    });

    it('displays the selected request type', async () => {
        const requestType = 'Kontenjan Arttırımı';
        const wrapper = mount(MakeRequest, {
            props: { 
                selectedRequestName: requestType ,
                selectedRequestTypeId:1,
            }
        });
        await wrapper.vm.$nextTick();
        const optionElement = wrapper.find('select > option');
        const firstOptionElement = optionElement.element;
        expect(firstOptionElement.exists()).toBe(true);
        expect(firstOptionElement.element.value).toBe(requestType);
    });
    
    it('displays the request requirements when selected request is not null', async () => {
        const requestRequirements = [
            { name: 'Ders Kodu', type: 'single', pretext: 'req1' },
            { name: 'Ders Şubesi', type: 'multi', pretext: 'req2' },
        ];
        const wrapper = mount(MakeRequest, {
            props: { 
                selectedRequest: { getRequestTypeId: () => 1 }, 
                requestRequirements 
            }
        });
        expect(wrapper.findAll('.flex.flex-col.text-center.md:flex-row.py-2.text-white').length).toBe(requestRequirements.length);
    });

    it('updates the request info when requirement values change', async () => {
        const requirementValues = { req1: 'Value 1' };
        const requirementValuesMulti = { req2: 'Value 2' };
        const wrapper = mount(MakeRequest, {
            props: { requirementValues, requirementValuesMulti }
        });
        expect(wrapper.vm.requestInfo).toBe('req1: Value 1\nreq2: Value 2\n');
    });

    it('shows the confirmation popup when submit button is clicked', async () => {
        const wrapper = mount(MakeRequest);
        const requestInfo = 'Sample request info';
        await wrapper.setData({ requestInfo });
        const submitButton = wrapper.find('button');
        await submitButton.trigger('click');
        expect(wrapper.vm.toggleConfirmationPopup).toBe(true);
        expect(wrapper.vm.change).toBe(requestInfo);
    });

    it('does not show the confirmation popup when requirements are empty', async () => {
        const wrapper = mount(MakeRequest);
        await wrapper.setData({ requirementValues: {}, requirementValuesMulti: {}, requestInfo: '' });
        const submitButton = wrapper.find('button');
        await submitButton.trigger('click');
        expect(wrapper.vm.toggleConfirmationPopup).toBe(false);
        expect(wrapper.vm.change).toBe('');
    });
});