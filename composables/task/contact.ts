import {Task} from "@hennihaus/bamconfigbackend";

export const useContact = (task: Ref<Task>) => {
    const name = computed(
        () => `${task.value.contact.firstname} ${task.value.contact.lastname}`
    );
    const emailLink = computed(() => `mailto:${task.value.contact.email}`);

    return {
        name,
        emailLink,
    };
};