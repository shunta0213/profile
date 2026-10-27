-- Export a temporary copy, leaving the source and other open documents alone.
on run arguments
    set sourceFile to POSIX file (item 1 of arguments)
    set sourceName to name of (info for sourceFile)
    set outputPath to item 2 of arguments
    set cvDocument to missing value
    tell application "Microsoft Word"
        try
            open sourceFile read only true add to recent files false
            set cvDocument to document sourceName
            save as cvDocument file name outputPath file format format PDF add to recent files false
            close cvDocument saving no
        on error errorMessage number errorNumber
            if cvDocument is not missing value then
                try
                    close cvDocument saving no
                end try
            end if
            error errorMessage number errorNumber
        end try
    end tell
end run
