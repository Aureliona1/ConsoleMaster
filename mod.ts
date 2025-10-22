const ESC: string = "\x1b[";
/**
 * Reset all colors and formats.
 */
export const reset: string = ESC + "0m";

class bg {
	static black: string = ESC + "40m";
	static red: string = ESC + "41m";
	static green: string = ESC + "42m";
	static yellow: string = ESC + "43m";
	static blue: string = ESC + "44m";
	static magenta: string = ESC + "45m";
	static cyan: string = ESC + "46m";
	static white: string = ESC + "47m";

	static brightBlack: string = ESC + "100m";
	static brightRed: string = ESC + "101m";
	static brightGreen: string = ESC + "102m";
	static brightYellow: string = ESC + "103m";
	static brightBlue: string = ESC + "104m";
	static brightMagenta: string = ESC + "105m";
	static brightCyan: string = ESC + "106m";
	static brightWhite: string = ESC + "107m";

	static rgb(r: number, g: number, b: number): string {
		// Set to 8-bit ints
		[r, g, b] = Array.from(new Uint8Array([r, g, b]));
		return ESC + `48;2;${r};${g};${b}m`;
	}
}

class fg {
	static black: string = ESC + "30m";
	static red: string = ESC + "31m";
	static green: string = ESC + "32m";
	static yellow: string = ESC + "33m";
	static blue: string = ESC + "34m";
	static magenta: string = ESC + "35m";
	static cyan: string = ESC + "36m";
	static white: string = ESC + "37m";

	static brightBlack: string = ESC + "90m";
	static brightRed: string = ESC + "91m";
	static brightGreen: string = ESC + "92m";
	static brightYellow: string = ESC + "93m";
	static brightBlue: string = ESC + "94m";
	static brightMagenta: string = ESC + "95m";
	static brightCyan: string = ESC + "96m";
	static brightWhite: string = ESC + "97m";

	static rgb(r: number, g: number, b: number): string {
		// Set to 8-bit ints
		[r, g, b] = Array.from(new Uint8Array([r, g, b]));
		return ESC + `38;2;${r};${g};${b}m`;
	}
}

/**
 * A collection of codes to manipulate text foreground and background colors.
 * Note that some codes may not work on all terminals.
 */
export class color {
	/**
	 * A collection of color codes to manipulate the foreground colors.
	 */
	static fg: fg = fg;
	/**
	 * A collection of color codes to manipulate the background colors.
	 */
	static bg: bg = bg;
}

class enable {
	static bold: string = ESC + "1m";
	static dim: string = ESC + "2m";
	static italic: string = ESC + "3m";
	static underline: string = ESC + "4m";
	static blinking: string = ESC + "5m";
	static reverseMode: string = ESC + "7m";
	static invisibleMode: string = ESC + "8m";
	static strikeThrough: string = ESC + "9m";
}

class disable {
	static bold: string = ESC + "22m";
	static dim: string = ESC + "22m";
	static italic: string = ESC + "23m";
	static underline: string = ESC + "24m";
	static blinking: string = ESC + "25m";
	static reverseMode: string = ESC + "27m";
	static invisibleMode: string = ESC + "28m";
	static strikeThrough: string = ESC + "29m";
}

/**
 * A collection of text formatting codes.
 */
export class format {
	/**
	 * Enable the format.
	 */
	static enable: enable = enable;
	/**
	 * Disable the format.
	 * Note all formats can be cleared with the {@link reset} string.
	 */
	static disable: disable = disable;
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
