const ESC: string = "\x1b[";
/**
 * Reset all colors and formats.
 */
export const reset: string = ESC + "0m";

const bg = {
	black: ESC + "40m",
	red: ESC + "41m",
	green: ESC + "42m",
	yellow: ESC + "43m",
	blue: ESC + "44m",
	magenta: ESC + "45m",
	cyan: ESC + "46m",
	white: ESC + "47m",

	brightBlack: ESC + "100m",
	brightRed: ESC + "101m",
	brightGreen: ESC + "102m",
	brightYellow: ESC + "103m",
	brightBlue: ESC + "104m",
	brightMagenta: ESC + "105m",
	brightCyan: ESC + "106m",
	brightWhite: ESC + "107m"
} as const;

const fg = {
	black: ESC + "30m",
	red: ESC + "31m",
	green: ESC + "32m",
	yellow: ESC + "33m",
	blue: ESC + "34m",
	magenta: ESC + "35m",
	cyan: ESC + "36m",
	white: ESC + "37m",

	brightBlack: ESC + "90m",
	brightRed: ESC + "91m",
	brightGreen: ESC + "92m",
	brightYellow: ESC + "93m",
	brightBlue: ESC + "94m",
	brightMagenta: ESC + "95m",
	brightCyan: ESC + "96m",
	brightWhite: ESC + "97m"
} as const;

/**
 * A collection of codes to manipulate text foreground and background colors.
 * Note that some codes may not work on all terminals.
 */
export class color {
	/**
	 * A collection of color codes to manipulate the foreground colors.
	 */
	static fg: typeof fg = fg;
	/**
	 * A collection of color codes to manipulate the background colors.
	 */
	static bg: typeof bg = bg;

	/**
	 * Generate a 24-bit (truecolor) color code.
	 * @param r The red component (0 - 255).
	 * @param g The green component (0 - 255).
	 * @param b The blue component (0 - 255).
	 * @param bg Whether to make the color for the background, or the foreground (default - false).
	 */
	static rgb(r: number, g: number, b: number, bg = false): string {
		// Set to 8-bit ints
		[r, g, b] = Array.from(new Uint8Array([r, g, b]));
		return ESC + `${bg ? 4 : 3}8;2;${r};${g};${b}m`;
	}
}

const enable = {
	bold: ESC + "1m",
	dim: ESC + "2m",
	italic: ESC + "3m",
	underline: ESC + "4m",
	blinking: ESC + "5m",
	reverseMode: ESC + "7m",
	invisibleMode: ESC + "8m",
	strikeThrough: ESC + "9m"
} as const;

const disable = {
	bold: ESC + "22m",
	dim: ESC + "22m",
	italic: ESC + "23m",
	underline: ESC + "24m",
	blinking: ESC + "25m",
	reverseMode: ESC + "27m",
	invisibleMode: ESC + "28m",
	strikeThrough: ESC + "29m"
} as const;

/**
 * A collection of text formatting codes.
 */
export class format {
	/**
	 * Enable the format.
	 */
	static enable: typeof enable = enable;
	/**
	 * Disable the format.
	 * Note all formats can be cleared with the {@link reset} string.
	 */
	static disable: typeof disable = disable;
}

/**
 * Hex shortcuts to commonly used characters that can control the console.
 */
export class character {
	/**
	 * Backspace character.
	 */
	static backspace: string = "\x08";
	/**
	 * Horiozontal tab character.
	 */
	static tab: string = "\x09";
	/**
	 * New line character.
	 */
	static newLine: string = "\x0a";
	/**
	 * Vertical tab character.
	 */
	static tabVertical: string = "\x0b";
	/**
	 * New page character.
	 */
	static newPage: string = "\x0c";
	/**
	 * Carriage return character. Moves the cursor to the start of the line.
	 */
	static cr: string = "\x0d";
	/**
	 * The standard escape character, this is used for most escape codes.
	 */
	static escape: string = "\x1b";
}

/**
 * Codes to move the cursor (the point where text is written from) around the screen.
 */
export class cursor {
	/**
	 * Move the cursor to the home position (0, 0).
	 */
	static home: string = ESC + "H";
	/**
	 * Move the cursor to a certain row and column.
	 */
	static rowCol = (row: number, col: number): string => `${ESC}${row};${col}f`;
	/**
	 * Move the cursor up a certain number of lines.
	 * The cursor will stay at the same column it was in before.
	 */
	static up = (lines: number): string => `${ESC}${lines}A`;
	/**
	 * Move the cursor down a certain number of lines.
	 * The cursor will stay at the same column it was in before.
	 */
	static down = (lines: number): string => `${ESC}${lines}B`;
	/**
	 * Move the cursor right a certain number of columns.
	 */
	static right = (columns: number): string => `${ESC}${columns}C`;
	/**
	 * Move the cursor left a certain number of columns.
	 */
	static left = (columns: number): string => `${ESC}${columns}D`;
	/**
	 * Move the cursor down a certain number of lines.
	 * The cursor will be moved to the beginning of this line.
	 */
	static downBeginning = (lines: number): string => `${ESC}${lines}E`;
	/**
	 * Move the cursor up a certain number of lines.
	 * The cursor will be moved to the beginning of this line.
	 */
	static upBeginning = (lines: number): string => `${ESC}${lines}F`;
	/**
	 * Move the cursor to a specified column in its current row.
	 */
	static col = (col: number): string => `${ESC}${col}G`;
	/**
	 * Move the cursor up a line.
	 */
	static upOne: string = character.escape + " M";
	/**
	 * Save the location of the cursor.
	 */
	static saveCursor: string = character.escape + " 7";
	/**
	 * Move the cursor to the saved location.
	 */
	static gotoSave: string = character.escape + " 8";
}

/**
 * Codes to erase parts of the screen.
 * Note that the cursor will stay in the same position after erasing as it was before.
 * Ensure that you move the cursor to your desired location after erasing.
 */
export class erase {
	/**
	 * Erase from the cursor to the end of the screen.
	 */
	static fromCursor: string = ESC + "0J";
	/**
	 * Erase from the start of the screen to the cursor location.
	 */
	static untilCursor: string = ESC + "1J";
	/**
	 * Erase the visible screen.
	 */
	static screen: string = ESC + "2J";
	/**
	 * Erase from the cursor to the end of the line.
	 */
	static cursorToLine: string = ESC + "0K";
	/**
	 * Erase from the start of the line to the cursor.
	 */
	static lineToCursor: string = ESC + "1K";
	/**
	 * Erase the entire line.
	 */
	static line: string = ESC + "2K";
}
