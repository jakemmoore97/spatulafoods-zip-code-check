const zipCodes = [
  'M4K',
  'M1S',
  'L6L',
  'L4Z',
  'L1W',
  'M5S',
  'M4L',
  'M9V',
  'M9P',
  'M2N',
  'L6P',
  'L5T',
  'L4Y',
  'M4H',
  'M6A',
  'M9W',
  'L6A',
  'L4W',
  'L6J',
  'M4V',
  'L6B',
  'M9R',
  'L6E',
  'L3X',
  'M5X',
  'M9B',
  'L9E',
  'M8Z',
  'M5W',
  'L1Y',
  'L6V',
  'L4T',
  'L5K',
  'L7G',
  'M5V',
  'L3R',
  'M4T',
  'L4X',
  'L6Z',
  'M7A',
  'M8V',
  'M6P',
  'L5C',
  'L6W',
  'L4S',
  'M4A',
  'L7K',
  'L0P',
  'M6M',
  'M4P',
  'L5R',
  'L1N',
  'M9A',
  'M1L',
  'M9C',
  'M3N',
  'L4B',
  'L1M',
  'M4E',
  'L0C',
  'M1M',
  'M4W',
  'L5N',
  'M3M',
  'M5T',
  'L7A',
  'L6Y',
  'M3J',
  'L3P',
  'L0J',
  'M3B',
  'M3L',
  'M1E',
  'L7E',
  'M9N',
  'M2K',
  'L1H',
  'L4A',
  'L9T',
  'M5L',
  'L7C',
  'M2L',
  'M5H',
  'L1R',
  'L1S',
  'M6N',
  'L6R',
  'L5J',
  'M8X',
  'L6T',
  'M9M',
  'L5H',
  'M1T',
  'M8Y',
  'M1H',
  'M6C',
  'M4N',
  'L1P',
  'L1G',
  'L5B',
  'L4H',
  'L0G',
  'M1G',
  'M5K',
  'M6R',
  'M1P',
  'L9N',
  'M6G',
  'L5W',
  'M8W',
  'L1K',
  'M1N',
  'L6M',
  'L6X',
  'M4S',
  'L9P',
  'L5G',
  'L4E',
  'L5E',
  'M2M',
  'L5L',
  'L3Z',
  'M4X',
  'M1K',
  'M9L',
  'L0H',
  'M5J',
  'M6K',
  'L9R',
  'L1X',
  'L7J',
  'M4C',
  'M2P',
  'M4M',
  'M5N',
  'L9L',
  'M6S',
  'M6L',
  'M4J',
  'L5S',
  'M3H',
  'M1W',
  'M3K',
  'L4G',
  'L5P',
  'L1Z',
  'M1R',
  'M1B',
  'M4R',
  'L5A',
  'L4J',
  'L5V',
  'L1L',
  'M1V',
  'L6C',
  'M5M',
  'M5E',
  'M6J',
  'M4G',
  'L4K',
  'M2H',
  'L1J',
  'M6E',
  'L3T',
  'L6H',
  'L1T',
  'M5A',
  'M6H',
  'M5B',
  'M7Y',
  'L6G',
  'L1V',
  'L3Y',
  'L3S',
  'M3C',
  'L6S',
  'M1X',
  'M1J',
  'M5R',
  'M6B',
  'L5M',
  'M4B',
  'M5G',
  'L4C',
  'M2J',
  'M5P',
  'M3A',
  'L4L',
  'L7B',
  'M4Y',
  'M5C',
  'M2R',
  'M1C',
  'L6K',
  'L4V',
  'M8Y',
  'M8Z',
  'M9A',
  'M9B',
  'M9C',
  'M9P',
  'M9R',
  'M8V',
  'M8W',
  'M8X',
  'M9V',
  'M9W',
  'L3P',
  'L3R',
  'L3S',
  'L6B',
  'L6C',
  'L6E',
  'L6G',
  'L4T',
  'L4V',
  'L4W',
  'L4X',
  'L4Y',
  'L4Z',
  'L5A',
  'L5B',
  'L5C',
  'L5E',
  'L5G',
  'L5H',
  'L5J',
  'L5K',
  'L5L',
  'L5M',
  'L5N',
  'L5P',
  'L5R',
  'L5S',
  'L5T',
  'L5V',
  'L5W',
  'M2H',
  'M2J',
  'M2K',
  'M2L',
  'M2M',
  'M2N',
  'M2P',
  'M2R',
  'M3A',
  'M3B',
  'M3C',
  'M3H',
  'M3J',
  'M3K',
  'M3L',
  'M3M',
  'M3N',
  'M4A',
  'M4N',
  'M5M',
  'M6A',
  'M6L',
  'M6M',
  'M9L',
  'M9M',
  'M9N',
  'L0J',
  'L3T',
  'L4B',
  'L4C',
  'L4E',
  'L4H',
  'L4J',
  'L4K',
  'L4L',
  'L4S',
  'L6A',
  'M4B',
  'M4G',
  'M4H',
  'M1X',
  'M1B',
  'M1C',
  'M1E',
  'M1G',
  'M1H',
  'M1J',
  'M1K',
  'M1L',
  'M1M',
  'M1N',
  'M1P',
  'M1R',
  'M1S',
  'M1T',
  'M1V',
  'M1W',
  'M4C',
  'M4E',
  'M4J',
  'M4K',
  'M4L',
  'M4M',
  'M4P',
  'M4R',
  'M4S',
  'M4T',
  'M4V',
  'M4W',
  'M4X',
  'M4Y',
  'M5A',
  'M5B',
  'M5C',
  'M5E',
  'M5G',
  'M5H',
  'M5J',
  'M5K',
  'M5L',
  'M5N',
  'M5P',
  'M5R',
  'M5S',
  'M5T',
  'M5V',
  'M5W',
  'M5X',
  'M6B',
  'M6C',
  'M6E',
  'M6G',
  'M6H',
  'M6J',
  'M6K',
  'M6N',
  'M6P',
  'M6R',
  'M6S',
  'M7A',
  'M7Y',
  'L0H',
  'L1S',
  'L1T',
  'L1V',
  'L1W',
  'L1X',
  'L1Y',
  'L1Z',
  'L6P',
  'L6R',
  'L6S',
  'L6T',
  'L6V',
  'L6W',
  'L6X',
  'L6Y',
  'L6Z',
  'L7A',
  'L0P',
  'L7G',
  'L7J',
  'L9E',
  'L9T',
  'L0G',
  'L3X',
  'L3Y',
  'L4A',
  'L4G',
  'L7B',
  'L6H',
  'L6J',
  'L6K',
  'L6L',
  'L6M',
  'L1G',
  'L1H',
  'L1J',
  'L1K',
  'L1L',
  'L1M',
  'L1N',
  'L1P',
  'L1R',
  'L7L',
  'L7M',
  'L7N',
  'L7P',
  'L7R',
  'L7S',
  'L7T',
  'L8B',
  'L8E',
  'L8G',
  'L8H',
  'L8J',
  'L8K',
  'L8L',
  'L8M',
  'L8N',
  'L8P',
  'L8R',
  'L8S',
  'L8T',
  'L8V',
  'L8W',
  'L9A',
  'L9B',
  'L9C',
  'L9G',
  'L9H',
  'L9K',
]

type ZipCheck = (code: string) => boolean
export const checkZip: ZipCheck = code => zipCodes.includes(code.toUpperCase())
