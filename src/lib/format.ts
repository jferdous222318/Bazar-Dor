const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];


export function toBnDigits(value: string | number): string {
    return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);
}

export function fromBnDigits(value: string): string {
    return value.replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)));
}

export function toNumber(value: number | string): number {
    if (typeof value === "number") return value;
    const n = Number(fromBnDigits(value).replace(/[^\d.-]/g, ""));
    return Number.isNaN(n) ? 0 : n;
}

export function formatNumber(value: number, fractionDigits = 0): string {
    const text = value.toLocaleString("en-US", {
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
    });
    return toBnDigits(text);
}

export function formatPrice(value: number): string {
    return `${formatNumber(value, Number.isInteger(value) ? 0 : 2)} টাকা`;
}


export function formatPct(pct: number): string {
    return `${toBnDigits(Math.abs(pct).toFixed(1))}%`;
}

const UNIT_NAMES: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
};


export const unitName = (unit: string) => UNIT_NAMES[unit] ?? unit;


export const unitLabel = (unit: string) => `প্রতি ${unitName(unit)}`;


export function getBanglaDate(date: Date = new Date()): string {
    return new Intl.DateTimeFormat("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Dhaka",
    }).format(date);
}