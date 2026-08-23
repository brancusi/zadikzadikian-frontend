import type { Core } from '@strapi/strapi';

const allowedMediaTypes = [
  'image/*',
  'video/*',
  'audio/*',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.*',
  'text/plain',
  'text/csv',
];

const deniedExecutableTypes = [
  'application/vnd.microsoft.portable-executable',
  'application/x-msdownload',
  'application/x-msdos-program',
  'application/x-executable',
  'application/x-dosexec',
  'application/x-sh',
  'text/x-shellscript',
  'application/x-mach-binary',
];

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => {
  const uploadProvider = env('UPLOAD_PROVIDER', 'local');

  if (!['local', 'aws-s3'].includes(uploadProvider)) {
    throw new Error('UPLOAD_PROVIDER must be either "local" or "aws-s3".');
  }

  const required = (name: string): string => {
    const value = env(name);

    if (!value) {
      throw new Error(`${name} is required when UPLOAD_PROVIDER=aws-s3.`);
    }

    return value;
  };

  const provider =
    uploadProvider === 'aws-s3'
      ? {
          provider: 'aws-s3',
          providerOptions: {
            ...(env('S3_PUBLIC_BASE_URL') ? { baseUrl: env('S3_PUBLIC_BASE_URL') } : {}),
            s3Options: {
              credentials: {
                accessKeyId: required('S3_ACCESS_KEY_ID'),
                secretAccessKey: required('S3_ACCESS_SECRET'),
              },
              region: env('S3_REGION', 'auto'),
              endpoint: required('S3_ENDPOINT'),
              forcePathStyle: env.bool('S3_FORCE_PATH_STYLE', false),
              params: {
                Bucket: required('S3_BUCKET'),
                // Cloudflare R2 does not implement S3 ACLs; intentionally omit ACL.
              },
            },
            providerConfig: {
              preventOverwrite: true,
            },
          },
          actionOptions: {
            upload: {},
            uploadStream: {},
            delete: {},
          },
        }
      : {};

  return {
    'users-permissions': {
      config: {
        jwtManagement: 'refresh',
        sessions: {
          httpOnly: true,
        },
      },
    },
    upload: {
      config: {
        ...provider,
        security: {
          allowedTypes: allowedMediaTypes,
          deniedTypes: deniedExecutableTypes,
        },
      },
    },
  };
};

export default config;
