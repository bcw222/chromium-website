# Troubleshooting ChromeOS firmware uprev

## Missing 'component\_manifest.json' in bcs://\*.tbz2

If you see the following error message in the CQ:

```
 * Build BCS firmware updater to chromeos-firmwareupdate: -i /build/corsola/tmp/portage/chromeos-base/chromeos-firmware-corsola-0.0.1-r100/distdir -c /build/corsola/usr/share/chromeos-config/yaml/config.yaml --ec_component_manifest_output cme
Traceback (most recent call last):
  File "./pack_firmware.py", line 1676, in <module>
    main(sys.argv)
  File "./pack_firmware.py", line 1672, in main
    packer.Start(argv[1:])
  File "./pack_firmware.py", line 1602, in Start
    images, ec_component_manifests = self._WriteFirmwareImages(
  File "./pack_firmware.py", line 1438, in _WriteFirmwareImages
    fw_source = self._ExtractFirmware(firmware, unpack_dir)
  File "./pack_firmware.py", line 1403, in _ExtractFirmware
    raise PackError(
__main__.PackError: Missing 'component_manifest.json' in bcs://Skitty_EC.15194.195.0.tbz2
```

that means the BCS tarball `bcs://Skitty_EC.15194.195.0.tbz2` was not correctly packed.
Please do the following steps to re-upload the BCS tarball:

1. Use [`repack_firmware_tars`](https://chromium.googlesource.com/chromiumos/platform/dev-util/+/refs/heads/main/contrib/firmware/repack_fw_tars)
   (or your own script) to create the correct AP and EC tarballs.
2. Since BCS files cannot be overwritten, rename the tarballs by incrementing the "patch version".
   For example, rename `Skitty_EC.15194.195.0.tbz2` to `Skitty_EC.15194.195.1.tbz2`.
3. Upload the new AP and EC tarballs to BCS.
4. Revert your repositories to a clean state (especially the
   `chromeos-base/chromeos-firmware-*/Manifest` file in the private overlay).
5. Update the "patch version" of your firmware uprev CL to match the BCS file name
   (usually in project repo's `config.star`).
6. Follow the usual firmware uprev flow (building `chromeos-firmware-${BOARD}`,
   uploading CLs, ...).
