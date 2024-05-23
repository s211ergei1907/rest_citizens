export function isOver18(birthDate: string): boolean {
    const [year, month, day] = birthDate.split('-').map(Number);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - year - 1;

    if (currentDate.getMonth() + 1 > month ||
        (currentDate.getMonth() + 1 === month && currentDate.getDate() >= day)) {
        return age >= 18;
    }

    return age + 1 >= 18;
}